import { getSpotifyCard } from "../controller/SpotifyControllerV2.js"

export const SpotifyRoute = {
    Route: "/last-track", 
    Controller: getSpotifyCard
}