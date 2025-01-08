import { apiConfig } from "../apiConfig.js";

export const path = {
    "track": "last-track",
    "song": "audio",
    "license": "license"
}

export let mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
export const songUrl = `${apiConfig.baseUrl}${path.song}`
    "https://audio-ak.spotifycdn.com/audio/c361cbd42012ce4095a6b44e120afce1c092b54b?__token__=exp=1736086303~hmac=856ea4094a65bd8f0ef4f883e9bf6bbba474318d411206e93c0c02d0f10c873a"

export const video = document.querySelector("audio")