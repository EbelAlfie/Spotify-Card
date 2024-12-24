export class SocketRepository {
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

    getCDNURL(fileId, fileFormat) {
        $e.info("Requesting CDN URL for ", fileId);
        const n = "files/audio/interactive"
        const o = 
            `https://gew4-spclient.spotify.com/storage-resolve/${fileFormat ? `v2/${n}/${fileFormat}/${fileId}` : `${n}/${fileId}`}?version=10000000&product=9&platform=39&alt=json`;
        
        const config = {}

        return axiosRetry.request(config)
    }

    getJsonManifest(fileId) {
        const url = `https://seektables.scdn.co/seektable/${fileId}.json`
    }
}