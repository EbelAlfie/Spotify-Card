import { getErrorCard } from "../card/ErrorCard.js"
import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { TrackUseCase } from "../domain/TrackUseCase.js"
import { AuthRoute } from "../route/Spotify.js"
import { axiosRetry } from "../service/AxiosRetry.js"
import { TokenRepository } from "../service/TokenRepository.js"
import { TrackRepository } from "../service/TrackRepository.js"
import { spotifyError } from "../service/Utils.js"

const tokenHandler = async (code) => {
    const tokenRepository = new TokenRepository(code)
    const tokenUseCase = new TokenUseCase(tokenRepository)

    const tokenObj = await tokenUseCase.fetchAccessToken()

    if (tokenObj instanceof Error && tokenObj.status === 400) {
        
        return 
    }

    if (tokenObj instanceof Error) {
        
        return 
    }
    
    return {
        ...tokenObj
    }
}

export const getSpotifyCard = async () => {
    const {
        code = ""
    } = request.query

    axiosRetry.setMaxRetry()

    const tokens = await tokenHandler(code, response)
    if (!tokens) return 

    const trackRepository = new TrackRepository(tokens)
    const trackUseCase = new TrackUseCase(trackRepository)

    let currentTrack = await trackUseCase.getCurrentPlayingTrack()
    if (currentTrack instanceof Error && spotifyError(currentTrack)) {
        
        return
    }

    if (!currentTrack) {
        currentTrack = await trackUseCase.getLastPlayedTrack() 
        if (currentTrack instanceof Error) {
            
            return
        }
    }

    const image = currentTrack.images?.length > 0 ? currentTrack?.images[0]?.url : ""

    return {
            imageUrl: image, 
            songTitle: currentTrack.name, 
            artists: currentTrack.artists?.map(item => item.name).join(", "),
            audioUrl: currentTrack.previewUrl,
            isPlaying: currentTrack.isPlaying,
            refresh: currentTrack.progress
        }
}