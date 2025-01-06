import { appendBuffer, decodePSSHKey } from "../controller/utils/Utils.js";
import { fetchXhr, logEvent } from "./Utils.js"

export let mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
export const songUrl = "http://localhost:3030/audio"
    "https://audio-ak.spotifycdn.com/audio/c361cbd42012ce4095a6b44e120afce1c092b54b?__token__=exp=1736086303~hmac=856ea4094a65bd8f0ef4f883e9bf6bbba474318d411206e93c0c02d0f10c873a"

var totalSegments = 10;
var segmentLength = 0;
var segmentDuration = 0;
var bytesFetched = 0;
var requestedSegments = [];
for (var i = 0; i < totalSegments; ++i) requestedSegments[i] = false;

let initSegment = null

const contentStart = 1808
const contentEnd = 164941
