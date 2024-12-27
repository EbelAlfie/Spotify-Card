export class SocketService {
    constructor(config) {
        const {
            accessToken = ""
        } = config

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

        this.socket.onmessage = this._handleMessage.bind(this)

        return this.socket
    }

    _handleMessage(message) {
        const data = this._parseMessage(message)
        if (data.type !== "message") return 

        const connectionId = data.headers["Spotify-Connection-Id"]
        if (connectionId !== undefined) {
            this.onConnectionCreated(connectionId)
            return 
        }

        const payloads = data.payloads
        Array.isArray(payloads) && payloads.length && this._processPayload(payloads[0])
    }

    async onConnectionCreated(connectionId) {}

    _processPayload(payload) {
        const commandType = payload?.type 
        switch(commandType) {
            case 'replace_state':
                this.onPlayerStateChanged(payload)
                break ;
            default:    
        }
    }

    async onPlayerStateChanged(newState) {}

    async onConnectionError() {}
    
    async onConnectionClosed() {}

    /** Utils */
    _parseMessage(message) {
        const payload = message.data
        let data
        try {
            data = JSON.parse(payload)
            console.log(data)
        } catch(error) {
            console.log(error)
            return
        }
        return data
    }
}