export function getToken() {
    const clientSecret = process.env.CLIENT_SECRET ?? ""
    const clientId = process.env.CLIENT_ID ?? ""

    return Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
}

export function spotifyError(error) {
    return error.status !== 401 
    || error.status !== 403
    || error.status !== 429 
}