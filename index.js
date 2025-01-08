import express from "express"
import cors from "cors"
import { SpotifyRoute } from "./route/Spotify.js"
import { AuthRoute } from "./route/Auth.js"
import { createProxyMiddleware } from "http-proxy-middleware"
import { Audio } from "./route/Audio.js"
import { License } from "./route/License.js"
import { apiConfig } from "./apiConfig.js"
import ServerlessHttp from "serverless-http"

const app = express()

app.use(cors())

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

app.get(Audio.Route, Audio.Controller)

app.post(License.Route, express.raw({ type: "application/octet-stream" }), License.Controller)

// app.use(AuthRoute.Route, AuthRoute.Controller())

export const handler = ServerlessHttp(app)