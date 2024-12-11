import { getErrorCard } from "../card/ErrorCard.js"
import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { TrackUseCase } from "../domain/TrackUseCase.js"
import { axiosRetry } from "../service/AxiosRetry.js"
import { TokenRepository } from "../service/TokenRepository.js"
import { TrackRepository } from "../service/TrackRepository.js"

const tokenHandler = async (code, response) => {
    const tokenRepository = new TokenRepository(code)
    const tokenUseCase = new TokenUseCase(tokenRepository)

    const tokenObj = await tokenUseCase.fetchAccessToken()

    if (tokenObj instanceof Error) {
        response.status(500)
        response.send(getErrorCard(tokenObj.message))
        return 
    }

    const clientToken = await tokenUseCase.fetchClientToken({
        clientId: tokenObj?.clientId
    })
    if (clientToken instanceof Error) {
        response.status(500)
        response.send(getErrorCard(clientToken.message))
        return 
    }
    
    return {
        ...clientToken,
        ...tokenObj
    }
}

export const getSpotifyCard = async (request, response) => {
    console.log(request.query)
    const {
        code = ""
    } = request.query

    axiosRetry.setMaxRetry()
    
    const tokens = await tokenHandler(code, response)
    if (!tokens) return 

    const trackRepository = new TrackRepository(tokens)
    const trackUseCase = new TrackUseCase(trackRepository)

    const currentTrack = await trackUseCase.getLastDeviceState()
    if (currentTrack instanceof Error) {
        response.status(500)
        response.send(getErrorCard(currentTrack.message))
        return
    }

    const trackResult = await trackUseCase.getTrackById({
        trackId: currentTrack.trackUri
    })

    if (trackResult instanceof Error) {
        response.status(500)
        response.send(getErrorCard(trackResult.message))
        return
    }

    const image = trackResult.images?.length > 0 ? trackResult?.images[0]?.url : ""

    const spotifyCard = getSpotifyPlayerCard(
        {
            imageUrl: image, 
            songTitle: trackResult.name, 
            artists: trackResult.artists?.map(item => item.name).join(", "),
            audioUrl: trackResult.previewUrl,
            isPlaying: currentTrack.isPlaying
        }
    )

    response.status(200)
    response.send(spotifyCard)
}