import { apiConfig } from "../config.js";
import { path } from "./global.js";
import { playAudio, setupAudioPlayer } from "./Player.js";

const img = document.getElementById("spotiCard")

function main() {
    img.src = `${apiConfig.baseUrl}${path.track}`
    img.onload = () => {
        setupAudioPlayer()
    }
}

main()