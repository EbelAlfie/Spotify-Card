import { getErrorCard } from "../card/ErrorCard.js"
import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { AudioUseCase } from "../domain/AudioUseCase.js"
import { DeviceUseCase } from "../domain/DeviceUseCase.js"
import { SocketService } from "../domain/SocketService.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { TrackUseCase } from "../domain/TrackUseCase.js"
import { httpHandler } from "../service/apiUtil/HttpHandler.js"
import { AudioRepository } from "../service/AudioRepository.js"
import { DeviceRepository } from "../service/DeviceRepository.js"
import { TokenRepository } from "../service/TokenRepository.js"
import { TrackRepository } from "../service/TrackRepository.js"
import { parseTrack } from "./utils/Utils.js"

export async function getSpotifyCard(request, response) {
    const {
        debug = false
    } = request.query 

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

    const trackRepository = new TrackRepository()
    const trackUseCase = new TrackUseCase(trackRepository)

    const audioRepository = new AudioRepository()
    const audioUseCase = new AudioUseCase(audioRepository)

    const onConnectionCreated = async (connectionId) => {
        httpHandler.setConnectionId(connectionId)
        
        await deviceUseCase.registerDevice()

        const deviceState = await deviceUseCase.connectDevice()

        if (deviceState instanceof Error) {
            response.status(500)
            const error = deviceState.message
            response.send(debug ? error : getErrorCard(error))
            return 
        }

        const track = await trackUseCase.getTrackById({
            trackId: deviceState.trackUri
        })
    
        if (track instanceof Error) {
            response.status(500)
            const error = track.message
            response.send(debug ? error : getErrorCard(error))
            return
        }
    
        const image = track.images?.length > 0 ? track?.images[0]?.url : ""
    
        const responseResult = {
                imageUrl: image, 
                songTitle: track.name, 
                artists: track.artists?.map(item => item.name).join(", "),
                audioUrl: track.previewUrl,
                isPlaying: deviceState.isPlaying
            }
        const spotifyCard = getSpotifyPlayerCard(responseResult)
    
        response.status(200)
        response.send(debug ? responseResult : spotifyCard)

        await deviceUseCase.activateDevice()
    }

    const onPlayerStateChanged = async (command) => {
        const stateMachine = command.state_machine
        
        const {
            fileId = ""
        } = parseTrack(stateMachine)

        const cdnUrls = await audioUseCase.getCDNURL()

        if (cdnUrls instanceof Error) {
            response.status(500)
            const error = cdnUrls.message
            response.send(debug ? error : getErrorCard(error))
            return
        }

        

    }

    const socketService = new SocketService({
        accessToken: accessToken.accessToken
    })
    socketService.onConnectionCreated = onConnectionCreated
    socketService.onPlayerStateChanged = onPlayerStateChanged

    socketService.authenticateWebSocket()
}