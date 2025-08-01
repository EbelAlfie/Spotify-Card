export function decodePSSHKey(key) {
    const decodedKey = atob(key)
        ,decodedResult = new Uint8Array(decodedKey.length);
    let keyLength = decodedKey.length
    for (let i = 0; i < keyLength; i++)
        decodedResult[i] = decodedKey.charCodeAt(i)

    return decodedResult
}