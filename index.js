import express from "express"
import { SpotifyRoute } from "./route/Spotify.js"

const app = express()

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

console.log("Starting server...")
app.listen("3030", () => {
    console.log(`Server started at 3030`)
})