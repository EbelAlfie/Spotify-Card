import { AudioUseCase } from "../domain/AudioUseCase.js"
import { DeviceUseCase } from "../domain/DeviceUseCase.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { AudioRepository } from "../service/AudioRepository.js"
import { DeviceRepository } from "../service/DeviceRepository.js"
import { TokenRepository } from "../service/TokenRepository.js"

export async function getAudioBuffer(request, response) {
    const tokenRepository = new TokenRepository()
    const tokenUseCase = new TokenUseCase(tokenRepository)

    const accessToken = await tokenUseCase.fetchAccessToken()

    if (isError(accessToken, response, debug)) return 

    const clientToken = await tokenUseCase.fetchClientToken({
        clientId: accessToken?.clientId
    })

    if (isError(clientToken, response, debug)) return 

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