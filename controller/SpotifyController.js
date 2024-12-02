import { getSpotifyPlayerCard } from "../card/SpotifyCard.js"

export const getSpotifyCard = (request, response) => {
    response.send(getSpotifyPlayerCard())
}