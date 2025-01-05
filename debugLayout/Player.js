import { appendBuffer, decodePSSHKey } from "../controller/utils/Utils.js";
import { fetchXhr, logEvent } from "./Utils.js"

let mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
let video = document.querySelector('video');
let mediaSource = null
let sourceBuffer = null
let initSegment = null

const songUrl = "http://localhost:3030/audio"
    "https://audio-ak.spotifycdn.com/audio/c361cbd42012ce4095a6b44e120afce1c092b54b?__token__=exp=1736086303~hmac=856ea4094a65bd8f0ef4f883e9bf6bbba474318d411206e93c0c02d0f10c873a"

var totalSegments = 10;
var segmentLength = 0;
var segmentDuration = 0;
var bytesFetched = 0;
var requestedSegments = [];
for (var i = 0; i < totalSegments; ++i) requestedSegments[i] = false;

const contentStart = 1808
const contentEnd = 164941

export function setupAudioPlayer() {    
    if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
        mediaSource = new MediaSource();
        if (video.ms) return 

        mediaSource.video = video;
        video.ms = mediaSource;
        mediaSource.addEventListener("sourceopen", onSourceOpen);
        mediaSource.addEventListener("sourceclose", onSourceClose);
        video.src = window.URL.createObjectURL(mediaSource);
        initializeEME(
            video, 
            mimeCodec, 
            ""
        )
    } else {
        console.log("unsupported mimetype/ codec")
    }
}

export function playAudio() {
    fetchXhr({
        url: songUrl,
        callback: (result) =>{
            const {
                response = {},
                contentLength = 0,
                start = 0,
                end = 0 
            } = result ?? {}
            
            console.log(contentLength)
            console.log((contentLength / 1024 / 1024).toFixed(2), 'MB');
            console.log(`play ${response.byteLength}`)

            let audio =  initSegment ? appendBuffer(initSegment, response).buffer :  response 
            play(audio)
        },
        start: contentStart,
        end: contentEnd
    })
}

async function play(data) {
    const context = new window.AudioContext;
    const buffer = await context.decodeAudioData(data);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
}

export function getInitSegment(callback) {
    fetchXhr({
        url: songUrl,
        callback: (result) =>{
            const {
                response = {},
                contentLength = 0,
                start = 0,
                end = 0 
            } = result ?? {}

            initSegment = response

            callback()
        },
        start: 0,
        end: 1807
    })
}

function onSourceClose(error) {
    console.log(`Source close ${JSON.stringify(error)}`)
}

async function onSourceOpen(_) {
    let mediaSource = this

    sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    
    fetchXhr({
        url: songUrl,
        callback: (result) =>{
            const {
                response = {},
                contentLength = 0,
                start = 0,
                end = 0 
            } = result ?? {}
            console.log('fetched bytes: ', start, end);
            bytesFetched += end - start + 1;

            console.log(contentLength)
            console.log((contentLength / 1024 / 1024).toFixed(2), 'MB');
            segmentLength = Math.round(contentLength / totalSegments);

            requestedSegments[0] = true;
            // video.addEventListener('timeupdate', checkBuffer);
            video.addEventListener('canplay', function () {
                segmentDuration = video.duration / totalSegments;
                console.log("Play")
                video.play();
            });
            video.addEventListener("error", (error) => {
                logEvent(`error`, error) 
            })
            video.addEventListener("stalled", (event) => { logEvent(`stalled`, event) });
            video.addEventListener("suspend", (event) => logEvent(`sus`, event));
            video.addEventListener("*", (event) => logEvent(`all`, event));
            video.addEventListener("abort", (event) => logEvent(`abrt`, event));

            sourceBuffer.appendBuffer(response)
            // video.addEventListener('seeking', seek);
        },
        start: contentStart,
        end: contentEnd
    })
}

function initializeEME(video, mime, key) {
	const KEY = decodePSSHKey(key);

	var configMp4Mime = [{
        label: "audio-flac-sw-crypto",
		initDataTypes: ["cenc"],
		//"audioCapabilities": [{ "contentType": 'audio/mp4;codecs="mp4a.40.2"', robustness: 'SW_SECURE_CRYPTO' }],
        audioCapabilities: [
            {
                "contentType": "audio/mp4; codecs=\"flac\"",
                "robustness": "SW_SECURE_CRYPTO"
            },
            {
                "contentType": "audio/mp4; codecs=\"mp4a.40.2\"",
                "robustness": "SW_SECURE_CRYPTO"
            },
            {
                "contentType": "audio/mp4; codecs=\"mp4a.40.5\"",
                "robustness": "SW_SECURE_CRYPTO"
            }
        ],
		// codecs config is required
		videoCapabilities: [
            {
                "contentType": "video/mp4; codecs=\"avc1.64002a\""
            },
            {
                "contentType": "video/mp4; codecs=\"avc1.4d402a\""
            },
            {
                "contentType": "video/mp4; codecs=\"avc1.4d401f\""
            },
            {
                "contentType": "video/webm; codecs=\"vp9\""
            },
            {
                "contentType": "video/webm; codecs=\"vp8\""
            }
        ],
        distinctiveIdentifier: "optional",
        persistentState: "optional",
        sessionTypes: ["temporary"]
	}];
	configMp4Mime[0].videoCapabilities[0].contentType = mime;

	var WIDEVINE_KEY_SYSTEM = 'com.widevine.alpha';
	var CLEARKEY_KEY_SYSTEM = 'org.w3.clearkey';

	video.addEventListener('encrypted', handleEncrypted, false);

	navigator.requestMediaKeySystemAccess(WIDEVINE_KEY_SYSTEM, configMp4Mime).then(
        (keySystemAccess) => {
            return keySystemAccess.createMediaKeys()
        }
	).then(
	  (createdMediaKeys) => {
	    return video.setMediaKeys(createdMediaKeys);
	  }
	).catch(
	  function(error) {
	    console.error('Failed to set up MediaKeys', error);
	  }
	);
}

function handleEncrypted(event) {
	console.log("Encrypted event", event);
	//return;
	video = event.target;
	let session = video.mediaKeys.createSession();
	session.addEventListener('message', handleMessage, false);
	session.generateRequest(event.initDataType, event.initData).catch(
	  function(error) {
	    console.error('Failed to generate a license request', error);
	  }
	);
}