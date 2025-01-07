import { AudioUseCase } from "../domain/AudioUseCase.js"
import { DeviceUseCase } from "../domain/DeviceUseCase.js"
import { socketService } from "../domain/SocketService.js"
import { TokenUseCase } from "../domain/TokenUseCase.js"
import { httpHandler } from "../service/apiUtil/HttpHandler.js"
import { AudioRepository } from "../service/AudioRepository.js"
import { DeviceRepository } from "../service/DeviceRepository.js"
import { TokenRepository } from "../service/TokenRepository.js"
import { appendBuffer, calculateSegment, isError, parseTrack } from "./utils/Utils.js"

export async function getAudioBuffer(request, response) {
    const {
        debug = false
    } = request.query 

    const tokenRepository = new TokenRepository()
    const tokenUseCase = new TokenUseCase(tokenRepository)

    const accessToken = await tokenUseCase.fetchAccessToken()

    if (isError(accessToken, response, debug)) return 

    const clientToken = await tokenUseCase.fetchClientToken({
        clientId: accessToken?.clientId
    })

    if (isError(clientToken, response, debug)) return 

    httpHandler.setAccessToken(accessToken)
    httpHandler.setClientToken(clientToken)

    const deviceRepository = new DeviceRepository()
    const deviceUseCase = new DeviceUseCase(deviceRepository)

    const audioRepository = new AudioRepository()
    const audioUseCase = new AudioUseCase(audioRepository)

    const onPlayerStateChanged = async (command) => {
        const stateMachine = command.state_machine
        const stateRef = command.state_ref
        
        const {
            fileId = ""
        } = parseTrack(stateRef, stateMachine)

        const cdnUrls = await audioUseCase.getCDNURL(fileId)

        if (isError(cdnUrls, response, debug)) return

        const manifest = await audioUseCase.getJsonManifest(fileId)

        if (isError(manifest, response, debug)) return

        const {
            initSegment: initSegment,
            contentSegments: contentSegments
        } = calculateSegment(manifest)

        const initBufferResponse = 
            await audioUseCase.loadAudioBuffer(cdnUrls.uri, initSegment)

        if (isError(initBufferResponse, response, debug)) return

        const initBuffer = initBufferResponse.data
        let buffer = initBuffer

        console.log("Appending audio segments...")
        for(let i = 0; i < contentSegments.length; i++) {
            const bufferPerSegment = 
                await audioUseCase.loadAudioBuffer(cdnUrls.uri, contentSegments[i])
            if (isError(cdnUrls, response, debug)) return ;
                        
            const segmentBuffer = bufferPerSegment.data

            buffer = appendBuffer(buffer, segmentBuffer, 0, buffer.byteLength)
        }

        console.log(cdnUrls.uri)
        console.log(buffer)

        response.status(206)
        response.set(initBuffer.headers)
        response.contentType("application/json")
        response.send({
            audioBuffer: new Buffer.from(buffer.buffer),    
            pssh: manifest.pssh        
        })
    }

    socketService.onPlayerStateChanged = onPlayerStateChanged

    await deviceUseCase.activateDevice()
}