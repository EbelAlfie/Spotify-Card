import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { DeviceUseCase } from "../domain/DeviceUseCase.js"
import { socketService, SocketService } from "../domain/SocketService.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { TrackUseCase } from "../domain/TrackUseCase.js"
import { httpHandler } from "../service/apiUtil/HttpHandler.js"
import { DeviceRepository } from "../service/DeviceRepository.js"
import { TokenRepository } from "../service/TokenRepository.js"
import { TrackRepository } from "../service/TrackRepository.js"
import { isError, parseTrack } from "./utils/Utils.js"

export async function getSpotifyCard(request, response) {
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

    const trackRepository = new TrackRepository()
    const trackUseCase = new TrackUseCase(trackRepository)

    const onConnectionCreated = async (connectionId) => {
        httpHandler.setConnectionId(connectionId)
        
        await deviceUseCase.registerDevice()

        const deviceState = await deviceUseCase.connectDevice()

        if (isError(deviceState, response, debug)) return 

        const track = await trackUseCase.getTrackById({
            trackId: deviceState.trackUri
        })
    
        if (isError(track, response, debug)) return 
    
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
    }

    // const socketService = new SocketService({
    //     accessToken: accessToken.accessToken
    // })
    socketService.onConnectionCreated = onConnectionCreated

    socketService.authenticateWebSocket(accessToken.accessToken)
}