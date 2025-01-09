import { getSpotifyCard } from "../api/controller/SpotifyControllerV2.js";

export const SpotifyRoute = {
    Route: "/last-track", 
    Controller: getSpotifyCard
}