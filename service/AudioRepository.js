export class AudioRepository {
    constructor(config) {
        const {
            accessToken = ""
        } = config

        this.accessToken == accessToken ?? ""
    }

    async authenticateWebSocket() {
        const socket = new WebSocket(
            `wss://dealer.spotify.com/?access_token=${this.accessToken}`
        )

        socket.onmessage = _handleMessage

        return socket
    }

    _handleMessage(message) {
        const payload = message.data
        let data
        try {
            data = JSON.parse(payload)
        } catch(error) {
            return
        }
    }
}