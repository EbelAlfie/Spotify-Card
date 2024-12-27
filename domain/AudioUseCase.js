export class AudioUseCase {
    constructor(audioRepository) {
        if (!audioRepository) 
            throw Error("No repository provided")
        this.repository = audioRepository
    }

    getCDNURL(fileId, fileFormat) {
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
                return error
            })
    }
}