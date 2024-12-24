export class SocketUseCase {
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

    transferDeviceRequest(deviceId) {
        const old = "g"
        const url = `https://gew4-spclient.spotify.com/connect-state/v1/connect/transfer/from/${old}/to/${deviceId}` 
        const method = "POST"
    }
}