import { Config } from "../index.js"
import { SpotifyRoute } from "../route/Spotify.js"

export const login = async (request, response) => {
    const CLIENT_ID = process.env.CLIENT_ID ?? ""

    const param = {
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: `${Config.baseUrl}${SpotifyRoute.Route}`,
    }

    const queryParam = Object.entries(param)
        .map(item => `${item[0]}=${item[1]}`)
        .join("&")

    response.redirect(`https://accounts.spotify.com/authorize?${queryParam}`)
}