import axios from "axios"
import { axiosRetry } from "./AxiosRetry.js"

export class TrackRepository {
    constructor(tokenConfig) {
        const {
            accessToken = ""
        } = tokenConfig

        this.authorization = accessToken ?? ""
    }

    async getCurrentPlayingTrack() {
        let config = {
            method: 'get',
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            headers: { 
                'authorization': `Bearer ${this.authorization}`, 
            },
        };
        
        return axiosRetry.request(config)
    }

    async getRecentlyPlayed() {
        let config = {
            method: "GET",
            maxBodyLength: Infinity,
            headers: { 
                'authorization': `Bearer ${this.authorization}`, 
            },
            url: `https://api.spotify.com/v1/me/player/recently-played`
        }

        return axiosRetry.request(config)
    }

    async getTrackById(trackId) {
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: `https://api.spotify.com/v1/tracks?ids=${trackId}&market=from_token`,
            headers: { 
                'sec-ch-ua-platform': '"Linux"', 
                'authorization': `Bearer ${this.authorization}`, 
                'Referer': 'https://open.spotify.com/', 
                'client-token': this.clientToken, 
                'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"', 
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0', 
                'sec-ch-ua-mobile': '?0'
            }
        };

        return axiosRetry.request(config)
    }
}