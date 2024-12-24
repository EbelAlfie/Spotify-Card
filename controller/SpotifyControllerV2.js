import { getErrorCard } from "../card/ErrorCard"
import { SocketUseCase } from "../domain/AudioUseCase"
import { SocketService } from "../domain/SocketService"
import { TokenUseCase } from "../domain/TokenUseCase"
import { SocketRepository } from "../service/AudioRepository"
import { TokenRepository } from "../service/TokenRepository"

async function GetSpotifyCard(request, response) {
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

    const onConnectionCreated = (message) => {
        
    }

    const socketService = new SocketService({
        accessToken: accessToken.accessToken
    })
    socketService.authenticateWebSocket()
}