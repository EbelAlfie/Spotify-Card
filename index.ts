import express, { type Express } from "express";
import { SpotifyRoute } from "./route/Spotify"

const app = express()

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

console.log("Starting server...")
app.listen("3030", () => {
    console.log(`Server started at 3030`)
})