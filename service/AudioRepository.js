import { httpHandler } from "./apiUtil/HttpHandler.js";

export class AudioRepository {
    constructor() {}

    async getCDNURL(fileId, fileFormat = 10) {
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

    async loadAudioBuffer(audioUrl, byteRange) {
        const audioRange = byteRange.audio
        , range = `${audioRange.start}-${audioRange.end}`
        , expectedLength = audioRange.end + 1 - audioRange.start

        const config = {
            method: "GET",
            responseType: "arraybuffer",
            headers: {
                "Range": `bytes=${range}`
            },
            signal: {},
            timing: true,
            maxBodyLength: Infinity,
            metadata: {
                "requestURL": audioUrl,
                "segment": {
                    "index": -1,
                    "init": true,
                    "cacheBufferSet": true,
                    "timeStart": 0,
                    "timeEnd": 0,
                    "byteRanges": {
                        "audio": {
                            "start":audioRange.start,
                            "end": audioRange.end
                        }
                    }
                },
                "byteRangeHeader": "0-1241",
                "expectedLength": expectedLength
            }
        }

        return httpHandler
            .init(config)
            .request()
    }
}