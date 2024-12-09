import axios from "axios"

export class TrackRepository {

    constructor(tokenConfig) {
        const {clientToken = "", accessToken = ""} = tokenConfig

        this.authorization = accessToken ?? ""
        this.clientToken = clientToken ?? ""
        this.spotConnectionId = process.env.CONNECTION_ID ?? ""
    }

    async getLastDeviceState() {
        let data = JSON.stringify({
            "member_type": "CONNECT_STATE",
            "device": {
              "device_info": {
                "capabilities": {
                  "can_be_player": false,
                  "hidden": true,
                  "needs_full_player_state": true
                }
              }
            }
        });
        
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'https://gew4-spclient.spotify.com/connect-state/v1/devices/hobs_86133792d6f7240c655de45fa6bc7f30527',
            headers: { 
                'accept': 'application/json', 
                'accept-language': 'en-US,en;q=0.9,id;q=0.8', 
                'authorization': `Bearer ${this.authorization}`, 
                'client-token': this.clientToken, 
                'content-type': 'application/json', 
                'origin': 'https://open.spotify.com', 
                'priority': 'u=1, i', 
                'referer': 'https://open.spotify.com/', 
                'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-platform': '"Linux"', 
                'sec-fetch-dest': 'empty', 
                'sec-fetch-mode': 'cors', 
                'sec-fetch-site': 'same-site', 
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0', 
                'x-spotify-connection-id': this.spotConnectionId
            },
            data : data
        };
        
        return axios.request(config)
    }

    async getTrackById(trackId) {
        let config = {
            method: 'get',
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

        return axios.request(config)
    }
}