export const generateRandomDeviceId = (num = 40) => {
    const e = Math.ceil(num / 2);
    return crypto.getRandomValues(new Uint8Array(e))
}

export const generateDeviceIdObserver = (deviceId) => {
    const pattern = new RegExp("^([a-zA-Z0-9_%:-]{1,40}).*$")
    return `hobs_${deviceId}`.replace(pattern, "$1")
}