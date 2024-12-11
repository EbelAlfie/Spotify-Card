import axios from "axios";
import { axiosRetry } from "./AxiosRetry.js";
import { getToken } from "./Utils.js";
import { Config } from "../index.js";
import { SpotifyRoute } from "../route/Spotify.js";

export class TokenRepository {
    constructor(code) {
        this.me = code
    }

    async fetchAccessToken() {
        const requestBody = {
            grant_type: "authorization_code",
            code: this.me,
            redirect_uri: Config.baseUrl + SpotifyRoute.Route
        }

        const config = {
            method: "post",
            headers: {
                'authorization': `Basic ${getToken()}`,
                'Content-Type': "application/x-www-form-urlencoded"
            },
            url: "https://accounts.spotify.com/api/token",
            data: requestBody
        }

        return axiosRetry.request(config)
        .then(result => {
            return result
        })
    }
}