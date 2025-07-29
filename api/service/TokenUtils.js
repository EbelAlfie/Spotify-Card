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
    const secret = "GEZDGMJSGQYTENZYGM2DIMJRGA2DGMZUGEYTSOJVGEYTAOBSGMZDCMBRGMZDCMBRG43TGNJWGI2DKMZYGEYTSNBRGEZDCMBYGMYDQMRRGA2TCMJX"
    return otp.Secret.fromBase32(secret)
}