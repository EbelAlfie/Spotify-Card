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
            method: "POST",
            headers: {
                'authorization': `Basic ${getToken()}`,
                'Content-Type': "application/x-www-form-urlencoded"
            },
            url: "https://accounts.spotify.com/api/token",
            data: requestBody
        }

        return axiosRetry.request(config)
        .then(result => {
            this.refreshToken = result.data.refresh_token 
            return result
        })
    }

    async refreshToken() {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log(`HAHAHAHAHHA ${error}`)
                if (error.status === 401) 
                    return this.fetchRefreshToken()
                else return Promise.reject(error)
            }
        )
    }

    async fetchRefreshToken() {
        const requestBody = {
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken ?? "",
            client_id: clientId
        }

        const config = {
            method: "POST",
            headers: {
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