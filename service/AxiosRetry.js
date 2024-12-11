import axios from "axios";

class AxiosRetry {
    MAX_RETRY = 3
    countDown = this.MAX_RETRY

    setMaxRetry(retry) {
        this.MAX_RETRY = retry

        axios.interceptors.response.use(
            (response) => {
                return response
            }, 
            (error) => {
                this.countDown -= 1

                if (this.countDown > 0)
                    return axios.request(error.config)
                else
                    return Promise.reject(error)
            }
        )
    }

    async request(req) {
        if (this.countDown < 0) 
            this.countDown = this.MAX_RETRY

        return axios.request(req)
    }

}

export const axiosRetry = new AxiosRetry()