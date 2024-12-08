import { TokenRepository } from "../service/TokenRepository"
import { ClientTokenEntity, TokenEntity } from "./entity/TokenEntity"
import { ClientTokenRequest } from "./models/Request"

export class TokenUseCase {
    repository: TokenRepository

    constructor(repository: TokenRepository) {
        if (!repository) 
            throw Error("No repository provided")

        this.repository = repository
    }

    async fetchAccessToken(): Promise<TokenEntity> {
        return this.repository.fetchAccessToken()
        .then(response => {

            const data = response.data

            const clientId = data?.clientId ?? ""
            const accessToken= data?.accessToken ?? ""
            const accessTokenExpirationTimestampMs = data?.accessTokenExpirationTimestampMs ?? 0
            const isAnonymous= data?.isAnonymous ?? ""

            const token: TokenEntity = {
                clientId: clientId,
                accessToken: accessToken,
                accessTokenExpirationTimestampMs: accessTokenExpirationTimestampMs,
                isAnonymous: isAnonymous
            }
            return token 
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }

    async fetchClientToken(request: ClientTokenRequest): Promise<ClientTokenEntity> {
        return this.repository.fetchClientToken(request.clientId)
        .then(response => {
            const data = response.data
            const grantedToken = data.granted_token

            const token = grantedToken?.token ?? ""
            const expires = grantedToken?.expires_after_seconds ?? 0
            const refreshAt = grantedToken?.refresh_after_seconds ?? 0

            return {
                clientToken: token
            }
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }
}