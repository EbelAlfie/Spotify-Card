import { generateDeviceIdObserver, generateRandomDeviceId } from "./Utils"

export class DeviceRepository {
    constructor(config) {

    }

    registerDevice() {
        const deviceId = generateRandomDeviceId()
        const deviceIdObserver = generateDeviceIdObserver(deviceId)
        const url =
            `https://gew4-spclient.spotify.com/track-playback/v1/devices/${deviceIdObserver}`
        
    }
}