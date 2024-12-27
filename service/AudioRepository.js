import { httpHandler } from "./apiUtil/HttpHandler.js";

export class AudioRepository {
    constructor() {}

    getCDNURL(fileId, fileFormat = 10) {
        const n = "files/audio/interactive"
        const url = 
            `https://gew4-spclient.spotify.com/storage-resolve/${fileFormat ? `v2/${n}/${fileFormat}/${fileId}` : `${n}/${fileId}`}?version=10000000&product=9&platform=39&alt=json`;
        
        const config = {
            method: "GET",
            url: url
        }

        return httpHandler
            .init(config)
            .withAuthHeader()
            .request()
    }

    getJsonManifest(fileId) {
        const url = `https://seektables.scdn.co/seektable/${fileId}.json`
    }
}