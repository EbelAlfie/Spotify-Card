import { HttpHandler } from "./AxiosRetry";

export class AudioRepository {
    constructor(config) {
        const {
            clientToken = "", 
            accessToken = ""
        } = config

        console.log(accessToken)
        this.accessToken = accessToken ?? ""
    }

    getCDNURL(fileId, fileFormat) {
        const n = "files/audio/interactive"
        const o = 
            `https://gew4-spclient.spotify.com/storage-resolve/${fileFormat ? `v2/${n}/${fileFormat}/${fileId}` : `${n}/${fileId}`}?version=10000000&product=9&platform=39&alt=json`;
        
        const config = {}

        return HttpHandler.request(config)
    }

    getJsonManifest(fileId) {
        const url = `https://seektables.scdn.co/seektable/${fileId}.json`
    }
}