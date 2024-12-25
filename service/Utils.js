export const generateRandomDeviceId = (num = 40) => {
    const param = Math.ceil(num / 2);
    const rands = crypto.getRandomValues(new Uint8Array(param))
    let deviceId = "";
    for (let i = 0; i < rands.length; i++) {
        const o = rands[i];
        o < 16 && (deviceId += "0"),
        deviceId += o.toString(16)
    }
    return deviceId
}

export const generateDeviceIdObserver = (deviceId) => {
    const pattern = new RegExp("^([a-zA-Z0-9_%:-]{1,40}).*$")
    return `hobs_${deviceId}`.replace(pattern, "$1")
}