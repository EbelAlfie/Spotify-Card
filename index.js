import express from "express"
import { AuthRoute, SpotifyRoute } from "./route/Spotify.js"
import ServerlessHttp from "serverless-http"

export const Config = {
    port: "3030",
    baseUrl :`http://localhost:3030`
}

const app = express()

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

app.get(AuthRoute.Route, AuthRoute.Controller)

console.log("Starting server...")

ServerlessHttp(app)