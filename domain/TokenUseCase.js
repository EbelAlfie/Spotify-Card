export class TokenUseCase {
    constructor(repository) {
        if (!repository) 
            throw Error("No repository provided")

        this.repository = repository
    }

    async fetchAccessToken() {
        return this.repository.fetchAccessToken()
        .then(response => {

            const data = response.data

            const clientId = data.clientId
            const accessToken= data.accessToken
            const accessTokenExpirationTimestampMs= data.accessTokenExpirationTimestampMs
            const isAnonymous= data.isAnonymous

            const token = {
                clientId: clientId,
                accessToken: accessToken,
                accessTokenExpirationTimestampMs: accessTokenExpirationTimestampMs,
                isAnonymous: isAnonymous
            }
            return token 
        })
        .catch(error => {
            return error
        })
    }

    async getClientToken() {
        
    }
}