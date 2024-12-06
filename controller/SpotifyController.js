import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { SpotifyUseCase } from "../domain/SpotifyUseCase.js"
import { SpotifyRepository } from "../service/SpotifyRepository.js"

export const getSpotifyCard = async (request, response) => {
    const repository = new SpotifyRepository()
    const useCase = new SpotifyUseCase(repository)

    const trackResult = await useCase.getTrackById("0MJ5wsGpqu0gTJkx53ewxc")

    if (trackResult instanceof Error) {
        console.log(trackResult)
        response.status(500)
        response.send(trackResult.message)
        return
    }

    const spotifyCard = getSpotifyPlayerCard(
        {
            imageUrl: trackResult.images[0].url, 
            songTitle: trackResult.name, 
            artists: trackResult.artists.join(", "),
            audioUrl: trackResult.previewUrl
        }
    )

    response.status(200)
    response.send(spotifyCard)
}