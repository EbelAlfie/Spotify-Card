import axios from "axios";

class HttpHandler {
    MAX_RETRY = 5
    retryCount = this.MAX_RETRY

    authHeader = {}

    setMaxRetry(retry) {
        this.MAX_RETRY = retry
    }

    setAccessToken(accessToken) {
        this.authHeader['authorization'] = `Bearer ${accessToken}`
    }

    setClientToken(clientToken) {
        this.authHeader['client-token'] = clientToken
    }

    build() {
        return this
    }

    async request(req) {
        this.retryCount = this.MAX_RETRY
        axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (this.retryCount > 0) {
                this.retryCount -= 1
                return axios.request(error.config);
            } else 
                return Promise.reject(error);
        });

        return axios.request(req)
    }

    _setHeaders() {

    }
}

export const httpHandler = new HttpHandler()