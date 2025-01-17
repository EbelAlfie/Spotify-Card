export class AudioUseCase {
    constructor(audioRepository) {
        if (!audioRepository) 
            throw Error("No repository provided")
        this.repository = audioRepository
    }

    async getCDNURL(fileId, fileFormat) {
        return this.repository.getCDNURL(fileId, fileFormat)
            .then(response => {
                const data = response.data
                console.log(data)

                const cdnUrl = data.cdnurl ?? []
                const uri = cdnUrl.length > 1 ? data.cdnurl[0] : ""
                const fileId = data.fileid ?? ""
                return {
                    fileId: fileId,
                    uri: uri,
                    fallBackUrls: cdnUrl
                }
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    async getJsonManifest(fileId) {
        return this.repository.getJsonManifest(fileId)
            .then(response => {
                const data = response.data
                
                const seektableVersion = data.seektable_version ?? 1
                const offset = data.offset ?? 0
                const timescale = data.timescale ?? 0
                const segments = data.segments ?? []
                const encoderDelaySample = data.encoder_delay_samples ?? 0
                const paddingSample = data.padding_samples ?? 0
                const pssh = data.pssh ?? ""
                const psshWidevine = data.pssh_widevine ?? ""
                const indexRange = data.indexRange ?? []
                
                return {
                    seektableVersion: seektableVersion,
                    offset: offset,
                    timescale: timescale,
                    segments: segments,
                    encoderDelaySample: encoderDelaySample,
                    paddingSample: paddingSample,
                    pssh: pssh,
                    psshWidevine: psshWidevine,
                    indexRange: indexRange
                }
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    async loadAudioBuffer(audioUrl, byteRange) {
        return this.repository.loadAudioBuffer(audioUrl, byteRange)
            .then(response => {
                const data = response?.data ?? {}
                const headers = response?.headers ?? {}
                const metadata = response?.metadata ?? {}
                
                return {
                    data: data,
                    headers: headers,
                    metadata: metadata
                }
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    async fetchLicense(payload) {
        return this.repository.fetchLicense(payload)
            .then(response => { 
                const data = response.data ?? {}
                const header = response.headers ?? {}

                return {
                    data: data,
                    header: header
                }
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }
}