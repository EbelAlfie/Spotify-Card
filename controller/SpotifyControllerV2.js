import { getErrorCard } from "../card/ErrorCard"
import { SocketUseCase } from "../domain/SocketUseCase"
import { TokenUseCase } from "../domain/TokenUseCase"
import { SocketRepository } from "../service/SocketRepository"
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

    const socketRepository = new SocketRepository({
        accessToken: accessToken.accessToken
    })
    const socketUseCase = new SocketUseCase(socketRepository)

    socketUseCase.openWebSocketConnection()
}