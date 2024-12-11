export function getToken() {
    const clientSecret = process.env.CLIENT_SECRET ?? ""
    const clientId = process.env.CLIENT_ID ?? ""

    return Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
}