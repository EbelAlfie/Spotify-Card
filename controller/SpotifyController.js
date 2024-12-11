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
    
    return {
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

    const currentTrack = await trackUseCase.getCurrentPlayingTrack()
    if (currentTrack instanceof Error) {
        response.status(500)
        response.send(getErrorCard(currentTrack.message))
        return
    }

    const image = currentTrack.images?.length > 0 ? currentTrack?.images[0]?.url : ""

    const spotifyCard = getSpotifyPlayerCard(
        {
            imageUrl: image, 
            songTitle: currentTrack.name, 
            artists: currentTrack.artists?.map(item => item.name).join(", "),
            audioUrl: currentTrack.previewUrl,
            isPlaying: currentTrack.isPlaying
        }
    )

    response.status(200)
    response.send(spotifyCard)
}