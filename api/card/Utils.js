import axios from "axios"

export async function getImage(imageUrl) {
    try {
        const response = await axios.request({
            method: "GET",
            url: imageUrl,
            responseType: "arraybuffer"
        })
        
        const imageBuffer = response?.data ?? {}
        const type = response.headers['content-type'] ?? 'image/jpg'
        return getImageCover(type, imageBuffer)
    } catch (error) {
        console.log(error)
        return imageUrl
    }
}

function getImageCover(mime, imageBuffer) {
    const base64Img = new Buffer.from(imageBuffer).toString("base64")
    return `data:${mime};base64,${base64Img}`
}
