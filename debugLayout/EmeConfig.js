import { userCred } from "../config.js"

export const EmeConfig = {
    initType: "cenc",
    keySystem : "com.widevine.alpha",
    licenseServer : "https://gew4-spclient.spotify.com/widevine-license",
    license: "https://gew4-spclient.spotify.com/widevine-license/v1/audio/license",
    serverLicense: "https://gew4-spclient.spotify.com/melody/v1/license_url?keysystem=com.widevine.alpha&mediatype=audio&sdk_name=harmony&sdk_version=4.45.0",
    psshField: "pssh_widevine"
}

export async function requestLicense(payload) {
    const config = {
        method: "POST",
        responseType: "arraybuffer",
        maxBodyLength: Infinity,
        url: EmeConfig.license,
        headers: {
            "authorization": `Bearer ${userCred.accessToken}`,
            "client-token": userCred.clientToken
        },
        data: payload
    }
    return axios.request(config)
}