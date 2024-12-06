import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { SpotifyUseCase } from "../domain/SpotifyUseCase.js"
import { TrackRepository } from "../service/TrackRepository.js"

export const getSpotifyCard = async (request, response) => {
    const trackRepository = new TrackRepository()


    const useCase = new SpotifyUseCase(trackRepository)

    const trackResult = await useCase.getTrackById({
        trackId: "0MJ5wsGpqu0gTJkx53ewxc"
    })

    if (trackResult instanceof Error) {
        response.status(500)
        response.send(trackResult.message)
        return
    }

    const image = trackResult.images[0].url || ""

    const spotifyCard = getSpotifyPlayerCard(
        {
            imageUrl: image, 
            songTitle: trackResult.name, 
            artists: trackResult.artists.map(item => item.name).join(", "),
            audioUrl: trackResult.previewUrl
        }
    )

    response.status(200)
    response.send(spotifyCard)
}