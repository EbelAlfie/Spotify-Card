export type AccessTokenResponse = {
    clientId: string
    accessToken: string,
    accessTokenExpirationTimestampMs: number,
    isAnonymous: boolean
}