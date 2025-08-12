import * as otp from "otpauth"

export const generateSecret = (secret) => {
    const now = Date.now()
    return otp.TOTP.generate({
        secret: secret,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        timestamp: now
    })
}

export const getSecret = () => {
    const secret = 'X:<1zK2J|Oq2WLE3JNG`.},sdQ.%.';
    const version = 28
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
    return {
        secret: otpSec,
        version: version
    }
}