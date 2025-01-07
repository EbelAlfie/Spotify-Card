import axios from "axios";

class HttpHandler {
    MAX_RETRY = 5
    retryCount = this.MAX_RETRY
    config = {}

    authHeader = {}
    connectionIdHeader = {}

    setMaxRetry(retry) {
        this.MAX_RETRY = retry
    }

    setAccessToken(accessToken) {
        this.authHeader['authorization'] = `Bearer ${accessToken.accessToken}`
    }

    setClientToken(clientToken) {
        this.authHeader['client-token'] = clientToken.clientToken
    }

    setConnectionId(spotConnectionId) {
        this.connectionIdHeader['x-spotify-connection-id'] = spotConnectionId
    }

    getConnectionIdHeader() {
        return this.connectionIdHeader['x-spotify-connection-id'] ?? ""
    }

    init(config) {
        this.config = config ?? {
            method: 'GET',
            maxBodyLength: Infinity,
            url: "",
            headers: {},
            data : {}
        }
            
        return this
    }

    withAuthHeader() {
        Object.assign(this.config["headers"], this.authHeader)
        return this
    }

    withConnectionId() {
        Object.assign(this.config["headers"], this.connectionIdHeader)
        return this
    }

    async request() {
        axios.interceptors.response.use(
            response => response, 
            (error) => {
                if (this.retryCount > 0) {
                    this.retryCount -= 1
                    return axios.request(error.config)
                } else 
                    return Promise.reject(error)
            }
        );

        return axios.request(this.config)
    }
}

export const httpHandler = new HttpHandler()