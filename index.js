import express from "express"
import { AuthRoute, SpotifyRoute } from "./route/Spotify.js"
import serverless from "serverless-http"

export const Config = {
    port: "3030",
    baseUrl :`http://localhost:3030`
}

const app = express()

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

app.get(AuthRoute.Route, AuthRoute.Controller)

console.log("Starting server...")

serverless(app)

app.listen(Config.port, () => { console.log(`Listening to ${Config.port}`) })