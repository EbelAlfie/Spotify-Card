import { apiConfig } from "../apiConfig.js"
import { path } from "./global.js"
import { setupAudioPlayer } from "./Player.js"

const card = document.getElementById("card-container")
const title = document.getElementById("song-title")
const artist = document.getElementById("song-artist")  
const cover = document.getElementById("album-image")  
const track = document.getElementById("track-status")

const img = document.getElementById("spotiCard")

export async function getSpotiCardData() {
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

export function reload() {
    img.src = `${apiConfig.baseUrl}${path.track}`
    img.onload = () => {
        setupAudioPlayer()
    }
}