export class AudioUseCase {
    constructor(audioRepository) {
        if (!audioRepository) 
            throw Error("No repository provided")
        this.repository = audioRepository
    }

    openWebSocketConnection() {
        return this.repository.authenticateWebSocket()
        .then(websocket => {

        })
    }
}