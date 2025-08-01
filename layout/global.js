import { apiConfig } from "../common/apiConfig.js";

export const path = {
    "track": "last-track",
    "song": "audio",
    "license": "license"
}

export let mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
export const songUrl = `${apiConfig.baseUrl}${path.song}`

export const video = document.getElementById("audioPlayer")