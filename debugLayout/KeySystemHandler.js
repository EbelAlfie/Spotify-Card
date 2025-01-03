export function createMediaKeys() {
    const keySystem = navigator.requestMediaKeySystemAccess()
    
    const mediaKey = new MediaKeySystemAccess()
    mediaKey.keySystem = mediaKeySystem
    mediaKey.createMediaKeys()
}