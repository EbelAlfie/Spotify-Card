import * as otp from "otpauth"

export const generateSecret = () => {
    const now = Date.now()
    return otp.TOTP.generate({
        secret: getSecret(),
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        timestamp: now
    })
}

const getSecret = () => {
    const secret = '($r=Ho^/4LY|j>`#5';
    const encodedSec = secret.split("").map((ch, idx) => {
        const n = ch.charCodeAt(0)
        return n ^ ((idx % 33) + 9)
    });

    const hexSecret = encodedSec
        .map(num => num.toString())
        .join('')
        .split('')
        .map(digit => digit.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')

    const otpSec = otp.Secret.fromHex(hexSecret)
    return otpSec
}