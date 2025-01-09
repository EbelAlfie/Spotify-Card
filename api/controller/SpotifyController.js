import { DeviceUseCase } from "../domain/DeviceUseCase.js"
import { SocketService } from "../domain/SocketService.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { TrackUseCase } from "../domain/TrackUseCase.js"
import { DeviceRepository } from "../service/DeviceRepository.js"
import { TokenRepository } from "../service/TokenRepository.js"
import { TrackRepository } from "../service/TrackRepository.js"
import { isError } from "./utils/Utils.js"

class SpotifyController {
    socketConnection = null

    constructor(request, response) {
        const {
            accessToken = null,
            clientToken = null,
        } = this.getTokens()

        this.socketConnection = new SocketService({
            accessToken: accessToken.accessToken
        })

    }

    async getTokens(request, response) {
        const tokenRepository = new TokenRepository()
        const tokenUseCase = new TokenUseCase(tokenRepository)
    
        const accessToken = await tokenUseCase.fetchAccessToken()
    
        if (isError(accessToken, response)) return 
    
        const clientToken = await tokenUseCase.fetchClientToken({
            clientId: accessToken?.clientId
        })
    
        if (isError(clientToken, response)) return 
    
        httpHandler.setAccessToken(accessToken)
        httpHandler.setClientToken(clientToken)
        
        return {
            accessToken: accessToken,
            clientToken: clientToken
        }
    }

    async TrackController(request, response) {
        const deviceRepository = new DeviceRepository()
        const deviceUseCase = new DeviceUseCase(deviceRepository)
    
        const trackRepository = new TrackRepository()
        const trackUseCase = new TrackUseCase(trackRepository)
    
        const onConnectionCreated = async (connectionId) => {
            httpHandler.setConnectionId(connectionId)
            
            await deviceUseCase.registerDevice()

            const deviceState = await deviceUseCase.connectDevice()

            if (isError(deviceState)) return 

            const track = await trackUseCase.getTrackById({
                trackId: deviceState.trackUri
            })
        
            if (isError(track)) return 
        
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
        
        this.socketConnection?.authenticateWebSocket()
    }

}