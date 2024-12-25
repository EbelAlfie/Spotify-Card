export class SocketService {
    constructor(config) {
        const {
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

        this.socket.onmessage = this._parseMessage

        return this.socket
    }

    _handleMessage(message) {
        
    }

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
    }

    onConnectionCreated(connectionId) {
        const type = {
            headers: {
              'Spotify-Connection-Id': '=='
            },
            method: 'PUT',
            type: 'message',
            uri: 'hm://pusher/v1/connections/'
        }   
    }

    onStateChanged(newState) {

    }

}