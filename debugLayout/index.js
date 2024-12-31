const card = document.getElementById("card-container")
const title = document.getElementById("song-title")
const artist = document.getElementById("song-artist")  
const cover = document.getElementById("album-image")  
const track = document.getElementById("track-status")

var mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
var video = document.querySelector('video');

async function main() {
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

        onAudioBuffer()

    } catch (error) {
        console.log(error)
        title.innerHTML = error
    }
}

async function onAudioBuffer() {
    const video = document.querySelector("video")
    
    const mediaSource = new MediaSource
    video.src = URL.createObjectURL(mediaSource)
    mediaSource.addEventListener("sourceopen", () => {
        onSourceOpen(mediaSource, video)
    })
}

async function onSourceOpen(mediaSource, video) {
    var sourceBuffer = mediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
    try {
        const audioBuffer = (await axios.request({
            method: 'GET',
            url: "http://localhost:3030/audio",
            responseType: "arraybuffer",
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8', 
                'Cache-Control': 'max-age=0', 
                'Connection': 'keep-alive', 
            }
        }))

        const data = audioBuffer.data
        const audio = buffer.Buffer.from(data)
        
        console.log(`buffer ${audio}`)
        
        sourceBuffer.addEventListener('updateend', function (_) {
            document.addEventListener("mouseover", () => {
                video.load()
                video.play()
            })
        })

        sourceBuffer.appendBuffer(audio)
    } catch(error) {
        console.log(`audio error ${error}`)
    }
}

main()