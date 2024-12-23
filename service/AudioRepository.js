export class AudioRepository {
    constructor(config) {
        const {
            clientToken = "", 
            accessToken = ""
        } = config

        console.log(accessToken)
        this.accessToken = accessToken ?? ""
    }

    async authenticateWebSocket() {
        const socketUrl = `wss://gew4-dealer.spotify.com/?access_token=${this.accessToken}`
        this.socket = new WebSocket(socketUrl)

        this.socket.onopen = (event) => {
            console.log(`open ${event}`)
        }

        this.socket.onerror = (error) => {
            console.log(`error ${error}`)
            console.log(error.error)
            console.log(error.message)
            
        }

        this.socket.onclose = (event) => {
            console.log(`close ${event}`)
        }

        this.socket.onmessage = this._handleMessage

        return this.socket
    }

    _handleMessage(message) {
        const payload = message.data
        let data
        try {
            data = JSON.parse(payload)
            console.log(data)
        } catch(error) {
            console.log(error)
            return
        }
    }
}