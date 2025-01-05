import { appendBuffer } from "../controller/utils/Utils.js"
import { getSpotiCardData } from "./Card.js";
import { getInitSegment, playAudio, setupAudioPlayer } from "./Player.js";
import { fetchXhr, logEvent } from "./Utils.js"

function audioMain() {
    playAudio()

    setupAudioPlayer()
}

function main() {
    getSpotiCardData()
    audioMain()
}

main()