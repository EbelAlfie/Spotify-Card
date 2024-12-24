import axios from "axios";

export class AxiosRetry {
    MAX_RETRY = 5
    retryCount = this.MAX_RETRY

    setMaxRetry(retry) {
        this.MAX_RETRY = retry
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

    async #handleRetry(req, retryCount) {
        return this.request(req, retryCount)
    }

}