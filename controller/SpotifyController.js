import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"
import { SpotifyRepository } from "../service/SpotifyRepository.js"

export const getSpotifyCard = (request, response) => {
    const repository = new SpotifyRepository()

    repository.getTrackById("0MJ5wsGpqu0gTJkx53ewxc")

    response.send(getSpotifyPlayerCard())
}