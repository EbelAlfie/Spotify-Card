import { userCred } from "../config.js";
import { appendBuffer, decodePSSHKey, getSegmentForRange } from "../controller/utils/Utils.js";
import { EmeConfig } from "../domain/model/EmeConfig.js";

let mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
let video = document.querySelector('video');
let mediaSource = null
let sourceBuffer = null
let initSegment = null

const songUrl = "http://localhost:3030/audio"
    "https://audio-ak.spotifycdn.com/audio/c361cbd42012ce4095a6b44e120afce1c092b54b?__token__=exp=1736086303~hmac=856ea4094a65bd8f0ef4f883e9bf6bbba474318d411206e93c0c02d0f10c873a"

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
        // video.play();
    })

    await updateV2()
}

async function updateV2() {
    axios.request({
        method: "GET",
        url: songUrl,
        responseType: "arraybuffer",
        maxBodyLength: Infinity,
    }).then(response => {
        const audio = response.data

        sourceBuffer.appendBuffer(buffer.Buffer.from(audio))
    })
}

/** EME */
let KEY = null
export function initializeEME(video, mime, key) {
	KEY = decodePSSHKey(key);

	var configMp4Mime = [{
        label: "audio-flac-sw-crypto",
		initDataTypes: ["cenc"],
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

  let session = event.target
  let message = event.message

  console.log(message)

  const license = await axios.request({
    method: "POST",
    url: EmeConfig.license, //`http://localhost:3030/license`,
    headers: {
        "content-type": "application/octet-stream",
        "accept": "application/octet-stream",
        "authorization": `Bearer ${userCred.accessToken}`,
        "client-token": userCred.clientToken
    },
    data: message
  })

  console.log(new buffer.Buffer.from(license.data))

  session.update(new buffer.Buffer.from(license.data)).catch(
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