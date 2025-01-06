import { getSpotiCardData } from "./Card.js";
import { playAudio, setupAudioPlayer } from "./Player.js";
import { getAudioData } from "./PlayerManager.js";

async function audioMain() {
    // playAudio()

    await getAudioData()

    setupAudioPlayer()
}

function main() {
    getSpotiCardData()
    
    setupAudioPlayer()
    //audioMain()
}

main()