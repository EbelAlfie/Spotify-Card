import { getSpotifyCard } from "../controller/SpotifyController.js";

export const SpotifyRoute = {
    Route: "/last-track", 
    Controller: getSpotifyCard
}