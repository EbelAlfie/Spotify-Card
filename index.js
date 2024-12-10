import express from "express"
import { SpotifyRoute } from "./route/Spotify.js"

const app = express()

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

console.log("Starting server...")
const port = "3030"
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})