export type TokenEntity = {
    clientId: string,
    accessToken: string,
    accessTokenExpirationTimestampMs: number,
    isAnonymous: boolean
}

export type ClientTokenEntity = {
    clientToken: string
}