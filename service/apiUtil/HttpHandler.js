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

    withBody(body) {
        this.config["data"] = body
        return this
    }

    withHeaders(headers) {
        Object.assign(this.config["headers"], headers)
        return this
    }

    withMethod(method) {
        if (method != "GET" || method != "PUT" || method != "POST" || method != "DELETE") 
            return 

        this.config["method"] = method
        return this
    }

    withMaxBodyLength(bodyLength) {
        this.config["maxBodyLength"] = bodyLength ?? Infinity
        return this
    }

    withUrl(url) {
        this.config["url"] = url
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