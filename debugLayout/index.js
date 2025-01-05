import { appendBuffer } from "../controller/utils/Utils.js"
import { MediaSourceManager } from "./MediaSourceManager.js"
import { fetchXhr, logEvent } from "./Utils.js"

const card = document.getElementById("card-container")
const title = document.getElementById("song-title")
const artist = document.getElementById("song-artist")  
const cover = document.getElementById("album-image")  
const track = document.getElementById("track-status")

var mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
var video = document.querySelector('video');
const songUrl = "http://localhost:3030/audio"
    "https://audio-ak.spotifycdn.com/audio/c361cbd42012ce4095a6b44e120afce1c092b54b?__token__=exp=1736086303~hmac=856ea4094a65bd8f0ef4f883e9bf6bbba474318d411206e93c0c02d0f10c873a"

const contentStart = 1808
const contentEnd = 164941

var sourceBuffer = null

async function getSpotiCardData() {
    try {
        const {
            imageUrl = "", 
            songTitle = "", 
            artists = "", 
            audioUrl = "", 
            isPlaying = false
        } = (await axios.get("http://localhost:3030/last-track?debug=true")).data

        title.innerHTML = songTitle
        artist.innerHTML = artists
        cover.setAttribute("href", imageUrl)
        track.innerHTML = isPlaying ? "Playing" : "Paused"

    } catch (error) {
        console.log(error)
        title.innerHTML = error
    }
}

async function setupAudioPlayer() {    
    if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
        const mediaSource = (new MediaSourceManager()).initMediaSource()

        if (video.ms) return 

        mediaSource.video = video
	    video.ms = mediaSource

        video.currentTime = 0 
        video.src = URL.createObjectURL(mediaSource)

        mediaSource.addEventListener('sourceopen', onSourceOpen);
        mediaSource.addEventListener('sourceclose', onSourceClose);
    } else {
        console.log("unsupported mimetype/ codec")
    }
}

function onSourceClose(error) {
    console.log(`Source close ${JSON.stringify(error)}`)
}

var totalSegments = 10;
var segmentLength = 0;
var segmentDuration = 0;
var bytesFetched = 0;
var requestedSegments = [];
for (var i = 0; i < totalSegments; ++i) requestedSegments[i] = false;

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
            video.addEventListener('timeupdate', checkBuffer);
            video.addEventListener('canplay', function () {
                segmentDuration = video.duration / totalSegments;
                console.log("Play")
                video.play();
            });
            video.addEventListener("timeupdate", (event) => {
                
            })
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

function onTimeUpdate() {
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
            video.addEventListener('timeupdate', checkBuffer);
            video.addEventListener('canplay', function () {
                segmentDuration = video.duration / totalSegments;
                console.log("Play")
                video.play();
            });
            video.addEventListener("timeupdate", (event) => {
                
            })
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

function checkBuffer(_) {
    var currentSegment = getCurrentSegment();
    if (currentSegment === totalSegments && haveAllSegments()) {
        console.log('last segment', mediaSource.readyState);
        mediaSource.endOfStream();
        video.removeEventListener('timeupdate', checkBuffer);
    } else if (shouldFetchNextSegment(currentSegment)) {
        requestedSegments[currentSegment] = true;
        console.log('time to fetch next chunk', video.currentTime);
        fetchXhr(
            {
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

                    let buffer =  initSegment ? appendBuffer(initSegment, response).buffer :  response

                    sourceBuffer.appendBuffer(buffer)
                },
                start : bytesFetched,
                end : bytesFetched + segmentLength
            }, 
        )
    }
}

function getCurrentSegment () {
    return ((video.currentTime / segmentDuration) | 0) + 1;
  };

function haveAllSegments () {
return requestedSegments.every(function (val) { return !!val; });
};

function shouldFetchNextSegment (currentSegment) {
return video.currentTime > segmentDuration * currentSegment * 0.8 &&
    !requestedSegments[currentSegment];
};

function playAudio() {
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

let initSegment = null
function getInitSegment(callback) {
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

            main()
        },
        start: 0,
        end: 1807
    })
}

function main() {
    getSpotiCardData()

    // setupAudioPlayer()

    playAudio()
}

main()