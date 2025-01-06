import { httpHandler } from "./apiUtil/HttpHandler.js";

export class AudioRepository {
    constructor() {}

    async getCDNURL(fileId, fileFormat = 10) {
        const n = "files/audio/interactive"
        const url = 
            `https://gew4-spclient.spotify.com/storage-resolve/${fileFormat ? `v2/${n}/${fileFormat}/${fileId}` : `${n}/${fileId}`}?version=10000000&product=9&platform=39&alt=json`;
        
        const config = {
            method: "GET",
            url: url,
            headers: {}
        }

        return httpHandler
            .init(config)
            .withAuthHeader()
            .request()
    }

    async getJsonManifest(fileId) {
        const url = `https://seektables.scdn.co/seektable/${fileId}.json`
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: url,
            headers: {}
        }

        return httpHandler
            .init(config)
            .request()
    }

    async loadAudioBuffer(audioUrl, contentSegments) {
        const {
            byteRanges = {},
            timeStart = timeStart,
            timeEnd = timeEnd
        } = contentSegments ?? {}

        const audioRange = byteRanges.audio
        , range = `${audioRange.start}-${audioRange.end}`
        , expectedLength = audioRange.end + 1 - audioRange.start

        const metadata = {
            audioRange: audioRange
        }

        const config = {
            method: "GET",
            url: audioUrl,
            responseType: "arraybuffer",
            headers: {
                "Range": `bytes=${range}`
            },
            maxBodyLength: Infinity,
        }

        return httpHandler
            .init(config)
            .request()
            .then(response => {
                return {
                    ...response,
                    metadata: metadata
                }
            })
    }
}