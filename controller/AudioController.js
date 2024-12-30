import { getErrorCard } from "../card/ErrorCard.js"
import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { AudioUseCase } from "../domain/AudioUseCase.js"
import { DeviceUseCase } from "../domain/DeviceUseCase.js"
import { socketService, SocketService } from "../domain/SocketService.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { TrackUseCase } from "../domain/TrackUseCase.js"
import { httpHandler } from "../service/apiUtil/HttpHandler.js"
import { AudioRepository } from "../service/AudioRepository.js"
import { DeviceRepository } from "../service/DeviceRepository.js"
import { TokenRepository } from "../service/TokenRepository.js"
import { TrackRepository } from "../service/TrackRepository.js"
import { calculateSegment, isError, parseTrack } from "./utils/Utils.js"

export async function getAudioBuffer(request, response) {
    const {
        debug = false
    } = request.query 

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
        const stateRef = command.state_ref
        
        const {
            fileId = ""
        } = parseTrack(stateRef, stateMachine)

        const cdnUrls = await audioUseCase.getCDNURL(fileId)

        if (isError(cdnUrls, response, debug)) return

        const manifest = await audioUseCase.getJsonManifest(fileId)

        if (isError(manifest, response, debug)) return

        const contentSegments = calculateSegment(manifest)

        const audioBuffer = await audioUseCase.loadAudioBuffer(cdnUrls.uri, contentSegments[0])

        if (isError(audioBuffer, response, debug)) return

        response.status(200)
        response.type("application/octet-stream")
        response.send(audioBuffer)
    }

    socketService.onPlayerStateChanged = onPlayerStateChanged

    await deviceUseCase.activateDevice()
}