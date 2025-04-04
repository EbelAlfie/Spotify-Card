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

function parseTime(millis) {
    const rawSec = Math.floor(millis / 1e3)
        , rawMin = Math.floor(rawSec / 60)
        , hour = Math.floor(rawMin / 60)
        , i = 60 * hour
        , min = rawMin - i;
    return {
        hours: hour,
        minutes: min,
        seconds: rawSec - 60 * i - 60 * min
    }
}

export function timeText(timeStamp) {
    const { 
        hours = 0,
        minutes = 0,
        seconds = 0
    } = parseTime(timeStamp)

    return `${hours > 0 ? `${hours}:` : ""}${hours > 0 && minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}