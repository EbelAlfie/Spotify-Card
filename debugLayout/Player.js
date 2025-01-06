import { userCred } from "../config.js";
import { appendBuffer, decodePSSHKey, getSegmentForRange } from "../controller/utils/Utils.js";
import { timeOffset } from "../domain/model/Device.js";
import { EmeConfig, requestLicense } from "./EmeConfig.js";
import { contentSegments, getAudioSegment } from "./PlayerManager.js";
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

        video.playbackRate = 1
        initializeEME(
            video, 
            mimeCodec, 
            userCred.emeKey
        )
    } else {
        console.log("unsupported mimetype/ codec")
    }
}

function onSourceClose(error) {
    console.log(`Source close ${JSON.stringify(error)}`)
}

async function onSourceOpen(_) {
    let mediaSource = this
    sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

    video.addEventListener('canplay', () => {
        console.log("Play")
        video.play();
    });

    video.addEventListener("playing", () => {
        console.log(`video time ${video.currentTime}`)
    })
    
    video.addEventListener("abort", () => {
        console.log(`video abort ${video.currentTime}`)
    })

    video.addEventListener('timeupdate', update);
    
    await update()
}

var shouldInitSegment = true
async function update() {
    const time = calculateTime(video.currentTime)

    if (!time) return 

    const {
        timeStart,
        timeEnd
    } = time

    const rangedSegments = getSegmentForRange(contentSegments, timeStart, timeEnd)
    
    console.log("Segments ")
    console.log(rangedSegments)
    console.log(`current video time ${video.currentTime}`)
    
    for (const item of rangedSegments) {
        console.log(item)
        try {
            const segment = await getAudioSegment(item, shouldInitSegment)

            if (shouldInitSegment) 
                shouldInitSegment = false

            const {
                buffer = {},
                headers = {},
                metadata = {}
            } = segment ?? {}
            const contentLength = headers["content-length"]
            
            console.log(`content Length ${contentLength}`)
            console.log((contentLength / 1024 / 1024).toFixed(2), 'MB');
    
            sourceBuffer.appendBuffer(buffer)
            
        } catch (error) {
            console.log("error " + error)
        }
    }
    console.log("\n\n")
}

function calculateTime(currentTime = 0) {
    const offset = timeOffset.AUDIO
        , timeStart = currentTime
        , p = timeStart - currentTime;

        console.log("timeStart")
        console.log(timeStart)
        console.log(p > offset)
    if (p > offset)
        return null;
    const timeEnd = timeStart + (offset - p)
    console.log("timeEnd")
    console.log(timeEnd)
    return {
        timeStart : timeStart,
        timeEnd : timeEnd
    }
}

/** EME */
let KEY = null
export function initializeEME(video, mime, key) {
	KEY = decodePSSHKey(key);

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

	var WIDEVINE_KEY_SYSTEM = 'com.widevine.alpha';

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
	//console.log("Encrypted event", event);
	video = event.target;
	let session = video.mediaKeys.createSession();
    session.addEventListener("keystatuseschange", (msg) => console.log(msg));
	session.addEventListener('message', handleMessage, false);
	session.generateRequest(EmeConfig.initType, KEY.buffer).catch(
	  function(error) {
	    console.error('Failed to generate a license request', error);
	  }
	);
}

async function handleMessage(event) {
  console.log(event.message)

  let message = event.message
  let session = event.target;

  const license = await requestLicense(message)

  session.update(license.data).catch(
    function(error) {
      console.error('Failed to update the session', error);
    }
  );
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