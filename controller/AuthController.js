import { Config } from "../index.js"
import { SpotifyRoute } from "../route/Spotify.js"

export const login = async (request, response) => {
    const CLIENT_ID = process.env.CLIENT_ID ?? ""
    const scope = `
    user-read-playback-state
     user-read-currently-playing 
     user-read-recently-played
    `
    const param = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: `${Config.baseUrl}${SpotifyRoute.Route}`,
    }

    const queryParam = Object.entries(param)
        .map(item => `${item[0]}=${item[1]}`)
        .join("&")

    response.redirect(`https://accounts.spotify.com/authorize?${queryParam}`)
}