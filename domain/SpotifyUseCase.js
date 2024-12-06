export class SpotifyUseCase {
    constructor(repository) {
        if (repository === undefined || repository === null) 
            throw Error("No repository provided")
        this.repository = repository
    }

    async getLastDeviceState(params) {
        return this.repository.getLastDeviceState(params)
    }

    async getTrackById(params) {
        const {trackId} = params

        return this.repository.getTrackById(trackId)
        .then(result => {
            const tracks = result.data.tracks
            const firstTrack = tracks[0] 
            const album = firstTrack.album

            const trackId = firstTrack.id
            const artists = firstTrack.artists
            const images = album.images

            const name = firstTrack.name
            const uri = firstTrack.uri
            const previewUrl = firstTrack.previewUrl

            console.log(firstTrack)
            console.log(firstTrack.album)

            return {
                trackId: trackId,
                artists: artists,
                images: images,
                name: name,
                uri: uri,
                previewUrl: previewUrl
            }
        })
        .catch(error => {
            return Error(error)
        })
    }
}