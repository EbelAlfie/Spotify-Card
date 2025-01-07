import express from "express"
import cors from "cors"
import ServerlessHttp from "serverless-http"
import { SpotifyRoute } from "./route/Spotify.js"
import { AuthRoute } from "./route/Auth.js"
import { createProxyMiddleware } from "http-proxy-middleware"
import { Audio } from "./route/Audio.js"
import { License } from "./route/License.js"

export const app = express()

app.use(cors())

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

app.get(Audio.Route, Audio.Controller)

app.post(License.Route, express.raw(), License.Controller)

// app.use(AuthRoute.Route, AuthRoute.Controller())

console.log("Starting server...")
const port = "3030"
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

// export const handler = ServerlessHttp(app)