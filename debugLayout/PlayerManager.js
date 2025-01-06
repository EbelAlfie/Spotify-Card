import { userCred } from "../config.js"
import { appendBuffer, calculateSegment } from "../controller/utils/Utils.js"
import { AudioUseCase } from "../domain/AudioUseCase.js"
import { httpHandler } from "../service/apiUtil/HttpHandler.js"
import { AudioRepository } from "../service/AudioRepository.js"
import { mimeCodec } from "./global.js"
import { initializeEME } from "./Player.js"

let mediaSource = null
let sourceBuffer = null
let video = document.querySelector('video');

export let initSegment = null
export let contentSegments = null
export let cdnUrls = null

const audioRepository = new AudioRepository()
const audioUseCase = new AudioUseCase(audioRepository)

export async function getAudioData() {
    httpHandler.setAccessToken({
        accessToken: userCred.accessToken
    })
    httpHandler.setClientToken({
        clientToken: userCred.clientToken
    })

    const fileId = "c361cbd42012ce4095a6b44e120afce1c092b54b" //Burry the light
    const urls = await audioUseCase.getCDNURL(fileId)

    if (urls instanceof Error) return {}
    
    const manifest = await audioUseCase.getJsonManifest(fileId)

    if (!manifest || manifest instanceof Error) return {}

    const result = calculateSegment(manifest)

    initSegment = result.initSegment
    contentSegments = result.contentSegments
    cdnUrls = urls
}

export async function getAudioSegment(contentSegment, isInitSegment = false) {
    if (isInitSegment) {
        const initBufferResponse = 
            await audioUseCase.loadAudioBuffer(cdnUrls.uri, initSegment)

        if (initBufferResponse instanceof Error) return {}

        const initBuffer = initBufferResponse.data

        const bufferPerSegment = 
            await audioUseCase.loadAudioBuffer(cdnUrls.uri, contentSegment)
    
        let buffer = appendBuffer(initBuffer, bufferPerSegment.data, 0, initBuffer.byteLength) 

        return {
            buffer : buffer.buffer,
            headers : bufferPerSegment.headers,
            metadata : bufferPerSegment.metadata
        }
    } else {
        const bufferPerSegment = 
            await audioUseCase.loadAudioBuffer(cdnUrls.uri, contentSegment)
            
        return {
            buffer : bufferPerSegment.data,
            headers : bufferPerSegment.headers,
            metadata : bufferPerSegment.metadata
        }
    }
}