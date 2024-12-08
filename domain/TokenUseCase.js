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

    async fetchClientToken(clientId) {
        return this.repository.fetchClientToken(clientId)
        .then(response => {
            const data = response.data
            const grantedToken = data.granted_token

            const token = grantedToken.token
            const expires = grantedToken.expires_after_seconds
            const refreshAt = grantedToken.refresh_after_seconds

            return token
        })
        .catch(error => {
            return error 
        })
    }
}