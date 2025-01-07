import { playAudio, setupAudioPlayer } from "./Player.js";

const img = document.getElementById("spotiCard")

function main() {
    img.src = "http://localhost:3030/last-track"
    img.onload = () => {
        setupAudioPlayer()
    }
}

main()