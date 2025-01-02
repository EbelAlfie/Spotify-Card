import { MediaSourceManager } from "./MediaSourceManager.js"
import { fetchXhr } from "./Utils.js"

const card = document.getElementById("card-container")
const title = document.getElementById("song-title")
const artist = document.getElementById("song-artist")  
const cover = document.getElementById("album-image")  
const track = document.getElementById("track-status")

var mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
var video = document.querySelector('video');
const songUrl = 
    "https://audio-ak.spotifycdn.com/audio/840241d867ec0cf541193c8e6a629377ea7a8802?__token__=exp=1735921385~hmac=efcbd48329a1c032629bbb15e72c3f10dcdc4b7ae7b152441bd8a5f3dc26de8f"

const contentStart = 0
const contentEnd = 2916077

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
        video.currentTime = 0 
        video.src = URL.createObjectURL(mediaSource)

        mediaSource.addEventListener('sourceopen', onSourceOpen);
    } else {
        console.log("unsupported mimetype/ codec")
    }
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
                video.play();
            });
            video.addEventListener("error", (error) => {
                console.log(`Error ${error}`)
            })
            video.addEventListener("stalled", (event) => { console.log(`stalled ${event}`) });
            video.addEventListener("suspend", (event) => console.log(`sus ${event}`));
            video.addEventListener("*", (event) => console.log(`all ${event}`));
            video.addEventListener("abort", (event) => console.log(`all ${event}`));

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

                    sourceBuffer.appendBuffer(response)
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

function main() {
    setupAudioPlayer()

    getSpotiCardData()
}

main()