import { login } from "../controller/AuthController.js";
import { getSpotifyCard } from "../controller/SpotifyController.js";

export const SpotifyRoute = {
    Route: "/last-track", 
    Controller: getSpotifyCard
}

export const AuthRoute = {
    Route: "/", 
    Controller: login
}