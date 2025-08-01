import { apiConfig } from "../common/apiConfig.js"
import { path } from "./global.js"
import { setupAudioPlayer } from "./Player.js"


export function reload() {
    const img = document.getElementById("spotiCard")
    img.src = `${apiConfig.baseUrl}${path.track}`
    img.onload = () => {
        setupAudioPlayer()
    }
}