import { appendBuffer } from "../controller/utils/Utils.js"
import { getSpotiCardData } from "./Card.js";
import { playAudio, setupAudioPlayer } from "./Player.js";
import { getAudioData } from "./PlayerManager.js";
import { fetchXhr, logEvent } from "./Utils.js"

async function audioMain() {
    // playAudio()

    await getAudioData()

    setupAudioPlayer()
}

function main() {
    // getSpotifyCard()
    // getSpotiCardData()
    audioMain()
}

main()