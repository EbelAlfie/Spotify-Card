import { httpHandler } from "./apiUtil/HttpHandler.js";
import { generateSecret } from "./TokenUtils.js";

export class TokenRepository {
    constructor() {
        this.me = process.env.ME
    }

    async fetchClientToken(request) {
        const {
            clientId = ""
        } = request

        let config = {
            method: 'POST',
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

        return httpHandler
            .init(config)
            .request()
    }

    async fetchAccessToken() {
        const totp = generateSecret() //"036953"
        const totpServer = generateSecret() 
        const version = 21
        const config = {
            method: "get",
            headers: {
                "cookie": `sp_dc=${this.me};`
            },
            url: `https://open.spotify.com/api/token?reason=init&productType=web-player&totp=${totp}&totpServer=${totpServer}&totpVer=${version}`
        }

        return httpHandler
            .init(config)
            .request()
    }
}