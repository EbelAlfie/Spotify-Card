import { apiConfig } from "../apiConfig.js";
import { EmeConfig } from "../api/domain/model/EmeConfig.js";
import { mimeCodec, path, songUrl, video } from "./global.js";
import { reload } from "./Card.js";
import { decodePSSHKey } from "../api/controller/utils/Utils.js";

let mediaSource = null
let sourceBuffer = null

let psshKey = ""

export function setupAudioPlayer() {    
    if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
        mediaSource = new MediaSource();
        if (video.ms) return 

        mediaSource.video = video;
        video.ms = mediaSource;
        mediaSource.addEventListener("sourceopen", onSourceOpen);
        mediaSource.addEventListener("sourceclose", onSourceClose);
        video.src = window.URL.createObjectURL(mediaSource)
        video.playbackRate = 1

        initializeEME(video)
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
    })

    video.addEventListener("ended", () => {
        video.currentTime = 0
        reload()
    })

    await updateV2()
}

async function updateV2() {
    axios.request({
        method: "GET",
        url: songUrl,
        maxBodyLength: Infinity,
    }).then(response => {
        const {
            audioBuffer = {},
            pssh = ""
        } = response.data ?? {}

        console.log(response.data)
        const audio = Uint8Array.from(audioBuffer.data) ?? {}

        psshKey = decodePSSHKey(pssh)
        console.log("PSSH key: " + pssh)

        sourceBuffer.appendBuffer(buffer.Buffer.from(audio))
    })
}

/** EME */
export function initializeEME(video) {
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

	var WIDEVINE_KEY_SYSTEM = 'com.widevine.alpha'

    video.addEventListener('encrypted', (event) => handleEncrypted(event), false);

	navigator.requestMediaKeySystemAccess(WIDEVINE_KEY_SYSTEM, configMp4Mime).then(
        (keySystemAccess) => keySystemAccess.createMediaKeys()
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
    console.log(event)
	let session = video.mediaKeys.createSession()
    session.addEventListener("keystatuseschange", (msg) => console.log(msg));
	session.addEventListener('message', handleMessage, false);
	session.generateRequest(EmeConfig.initType, psshKey).catch(
	  function(error) {
	    console.error('Failed to generate a license request', error);
	  }
	);
}

async function handleMessage(event) {
  console.log("Media keys license request: " + new buffer.Buffer.from(event.message).toString("base64"))

  let session = event.target
  let message = event.message

  const license = await axios.request({
    method: "POST",
    responseType: "arraybuffer",
    maxBodyLength: Infinity,
    url: `${apiConfig.baseUrl}${path.license}`,
    headers: {
        "Content-Type": "application/octet-stream",
        "Accept": "application/json, text/plain, */*"
    },
    data: message
  })

  const licenseBuffer = new buffer.Buffer.from(license.data)
  console.log("License " + licenseBuffer.toString("base64"))

  session.update(licenseBuffer).catch(
    function(error) {
      console.error('Failed to update the session', error);
    }
  );
}