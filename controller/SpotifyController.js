import { getErrorCard } from "../card/ErrorCard.js"
import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { AudioUseCase } from "../domain/AudioUseCase.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { TrackUseCase } from "../domain/TrackUseCase.js"
import { AudioRepository } from "../service/AudioRepository.js"
import { TokenRepository } from "../service/TokenRepository.js"
import { TrackRepository } from "../service/TrackRepository.js"

const tokenHandler = async (debug, response) => {
    const tokenRepository = new TokenRepository()
    const tokenUseCase = new TokenUseCase(tokenRepository)

    const tokenObj = await tokenUseCase.fetchAccessToken()

    if (tokenObj instanceof Error) {
        response.status(500)
        const error = tokenObj.message
        response.send(debug ? error : getErrorCard(error))
        return 
    }

    const clientToken = await tokenUseCase.fetchClientToken({
        clientId: tokenObj?.clientId
    })
    if (clientToken instanceof Error) {
        response.status(500)
        const error = clientToken.message
        response.send(debug ? error : getErrorCard(error))
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
        debug = false
    } = request.query 
    
    const tokens = await tokenHandler(debug, response)
    if (!tokens) return 

    const audioRepository = new AudioRepository(tokens)
    const audioUseCase = new AudioUseCase(audioRepository)

    audioUseCase.openWebSocketConnection()

    const trackRepository = new TrackRepository(tokens)
    const trackUseCase = new TrackUseCase(trackRepository)

    const currentTrack = await trackUseCase.getLastDeviceState()
    if (currentTrack instanceof Error) {
        response.status(500)
        const error = currentTrack.message
        response.send(debug ? error : getErrorCard(error))
        return
    }

    const trackResult = await trackUseCase.getTrackById({
        trackId: currentTrack.trackUri
    })

    if (trackResult instanceof Error) {
        response.status(500)
        const error = trackResult.message
        response.send(debug ? error : getErrorCard(error))
        return
    }

    const image = trackResult.images?.length > 0 ? trackResult?.images[0]?.url : ""

    const responseResult = {
            imageUrl: image, 
            songTitle: trackResult.name, 
            artists: trackResult.artists?.map(item => item.name).join(", "),
            audioUrl: trackResult.previewUrl,
            isPlaying: currentTrack.isPlaying
        }
    const spotifyCard = getSpotifyPlayerCard(responseResult)

    response.status(200)
    response.send(debug ? responseResult : spotifyCard)
}