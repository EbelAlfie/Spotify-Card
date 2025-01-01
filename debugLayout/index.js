
const card = document.getElementById("card-container")
const title = document.getElementById("song-title")
const artist = document.getElementById("song-artist")  
const cover = document.getElementById("album-image")  
const track = document.getElementById("track-status")

var mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
var video = document.querySelector('video');

async function main() {
    onAudioBuffer()

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

async function playAudio(buffer) {
    const blob = new Blob([buffer], { type: mimeCodec });
    const url = window.URL.createObjectURL(blob);
    video.src = url;
}

async function onAudioBuffer() {    
    const mediaSource = new MediaSource
    video.src = URL.createObjectURL(mediaSource)

    mediaSource.addEventListener("sourceopen", onSourceOpen)
}

async function onSourceOpen(_) {
    let mediaSource = this
    var sourceBuffer = mediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
    try {
        fetchXhr(
            "https://audio-ak.spotifycdn.com/audio/c361cbd42012ce4095a6b44e120afce1c092b54b?__token__=exp=1735811410~hmac=6a797e1f07d4adbdd681d6635ec9cc17e28a4721c92193ee3e875a9c46426a31",
            // resp.url,
            (audioBuffer) =>{
                console.log(audioBuffer)
                
                sourceBuffer.addEventListener('updateend', function (_) {
                    mediaSource.endOfStream()
                    video.play()
                })

                sourceBuffer.appendBuffer(audioBuffer)
            }
        )
    } catch(error) {
        console.log(`audio error ${error}`)
    }
}

function fetchXhr(url, callback) {
    console.log(url);
    var xhr = new XMLHttpRequest;

    xhr.open('GET', url);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.9,id;q=0.8");
    xhr.setRequestHeader("Range", "bytes=0-1807");

    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      callback(xhr.response);
    };
    xhr.send();
}

main()