import express from "express"
import { SpotifyRoute } from "./route/Spotify"

const app = express()

app.get(SpotifyRoute.Route, SpotifyRoute.Controller)

app.listen("3030")