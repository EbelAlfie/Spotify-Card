import axios from "axios";

export class TokenRepository {

    constructor() {
        this.me = process.env.ME
    }

    async fetchClientToken(request) {
        const {clientId} = request

        let config = {
            method: 'post',
            url: "https://clienttoken.spotify.com/v1/clienttoken",
            headers: { 
                "content-type": "application/json",
                "accept": "application/json"
            },
            data: {
                client_data: {
                    client_version: "1.2.53.257.g47fa6c39",
                    client_id: clientId,
                    js_sdk_data: {
                        device_brand: "unknown",
                        device_model: "unknown",
                        os: "linux",
                        os_version: "unknown",
                        device_id: "hehee",
                        device_type: "computer"
                    }
                }
            }
        };

        return axios.request(config)
        .then(token => {
            console.log(JSON.stringify(token.data))
            return token
        })
    }

    async fetchAccessToken() {
        const config = {
            method: "get",
            headers: {
                "cookie": `sp_dc=${this.me};`
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