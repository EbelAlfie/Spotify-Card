import { AudioUseCase } from "../domain/AudioUseCase"
import { TokenUseCase } from "../domain/TokenUseCase"
import { AudioRepository } from "../service/AudioRepository"
import { TokenRepository } from "../service/TokenRepository"

export async function getAudioBuffer(request, response) {
    const tokenRepository = new TokenRepository()
    const tokenUseCase = new TokenUseCase(tokenRepository)

    const accessToken = await tokenUseCase.fetchAccessToken()

    if (accessToken instanceof Error) {
        response.status(500)
        const error = accessToken.message
        response.send(debug ? error : getErrorCard(error))
        return 
    }

    const clientToken = await tokenUseCase.fetchClientToken({
        clientId: accessToken?.clientId
    })

    if (clientToken instanceof Error) {
        response.status(500)
        const error = clientToken.message
        response.send(debug ? error : getErrorCard(error))
        return 
    }

    httpHandler.setAccessToken(accessToken)
    httpHandler.setClientToken(clientToken)

    const deviceRepository = new DeviceRepository()
    const deviceUseCase = new DeviceUseCase(deviceRepository)

    const audioRepository = new AudioRepository()
    const audioUseCase = new AudioUseCase(audioRepository)


    const onPlayerStateChanged = async (command) => {
        const stateMachine = command.state_machine
        
        const {
            fileId = ""
        } = parseTrack(stateMachine)

        const cdnUrls = await audioUseCase.getCDNURL(fileId)

        if (cdnUrls instanceof Error) {
            response.status(500)
            const error = cdnUrls.message
            response.send(debug ? error : getErrorCard(error))
            return
        }

        const manifest = await audioUseCase.getJsonManifest(fileId)

        if (manifest instanceof Error) {
            response.status(500)
            const error = manifest.message
            response.send(debug ? error : getErrorCard(error))
            return
        }

        const audioBuffer = await audioUseCase.loadAudioBuffer(cdnUrls.uri)

        if (audioBuffer instanceof Error) {
            response.status(500)
            const error = audioBuffer.message
            response.send(debug ? error : getErrorCard(error))
            return
        }

    }

    const socketService = new SocketService({
        accessToken: accessToken.accessToken
    })
    socketService.onPlayerStateChanged = onPlayerStateChanged

    await deviceUseCase.activateDevice()
}