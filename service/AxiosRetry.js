import axios from "axios";

export class AxiosRetry {
    MAX_RETRY = 5

    setMaxRetry(retry) {
        this.MAX_RETRY = retry
    }

    async request(req, retryCount = this.MAX_RETRY) {
        axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            return axios.request(error.config);
            // return Promise.reject(error);
        });

        return axios.request(req)
        // .catch(error => {
        //     if (retryCount - 1 >= 0) this.#handleRetry(req, retryCount - 1)

        //     // Promise.reject(error)
        // })
    }

    async #handleRetry(req, retryCount) {
        return this.request(req, retryCount)
    }

}