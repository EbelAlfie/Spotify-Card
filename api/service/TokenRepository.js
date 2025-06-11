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
        const config = {
            method: "get",
            headers: {
                "cookie": `sp_dc=${this.me};`
            },
            url: `https://open.spotify.com/api/token?reason=init&productType=web-player&totp=${totp}&totpServer=${totpServer}&totpVer=5&sTime=1743063046&cTime=1743063047192&buildVer=web-player_2025-03-27_1743057394716_7cfd796&buildDate=2025-03-27`
        }

        return httpHandler
            .init(config)
            .request()
    }
}