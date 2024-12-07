import axios from "axios";

export class TokenRepository {

    constructor() {

    }

    checkToken() {
        Date.now() >= e.accessTokenExpirationTimestampMs
    }

    async fetchClientToken() {
        let config = {
            method: 'post',
            url: "https://clienttoken.spotify.com/v1/clienttoken",
            headers: { 
                "content-type": "application/json",
                "accept": "application/json"
            }
        };

        return axios.request(config)
        .then(token => {
            console.log(token)
            return token
        })
    }

    async fetchAccessToken() {
        const config = {
            method: "get",
            headers: {
                "cookie": "sp_dc=AQCpBm24J1WwTOc7CmutCYgEn9aGi3PSC2aWSKjGGhRwMGcdqZqyOWh7SbcidV33olTP78TNn2mN-OK-4x8aNt0-u9_vqlKkRJWlmxkDz5gVtjzFaBDLW1QAddd-kK4jPPR1wZygGsjkmcvytVf68julnfdXMetC;"
            },
            url: "https://open.spotify.com/get_access_token?reason=transport&productType=web-player"
        }

        return axios.request(config)
        .then(result => {
            console.log(`ACCToken ${JSON.stringify(result.data)}`)
            return result
        })
    }
}