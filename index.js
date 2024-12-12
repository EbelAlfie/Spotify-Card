import express from "express"
import { SpotifyRoute } from "./route/Spotify.js"
import { AuthRoute } from "./route/Auth.js"

const app = express()

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

app.use(AuthRoute.Route, AuthRoute.Controller)

console.log("Starting server...")
const port = "3030"
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})