export class SpotifyUseCase {
    constructor(trackRepository) {
        if (trackRepository === undefined || trackRepository === null) 
            throw Error("No repository provided")
        this.repository = trackRepository
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
            const previewUrl = firstTrack.preview_url

            const mapped = {
                trackId: trackId,
                artists: artists,
                images: images,
                name: name,
                uri: uri,
                previewUrl: previewUrl
            }
            console.log(mapped)
            return mapped 
        })
        .catch(error => {
            return Error(error)
        })
    }
}