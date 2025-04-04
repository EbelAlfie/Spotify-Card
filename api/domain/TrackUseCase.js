export class TrackUseCase {
    constructor(trackRepository) {
        if (!trackRepository) 
            throw Error("No repository provided")
        this.repository = trackRepository
    }

    async getTrackById(params) {
        const {
            trackId = ""
        } = params

        return this.repository.getTrackById(trackId)
        .then(response => {            
            const tracks = response.data.tracks
            const firstTrack = tracks[0] 
            const album = firstTrack.album

            const trackId = firstTrack.id
            const artists = firstTrack.artists
            const images = album.images

            const name = firstTrack.name
            const uri = firstTrack.uri
            const previewUrl = firstTrack.preview_url

            const mapped = {
                trackId: trackId ?? "",
                artists: artists ?? [],
                images: images ?? [],
                name: name ?? "",
                uri: uri ?? "",
                previewUrl: previewUrl ?? ""
            }
            console.log(mapped)
            return mapped 
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }
}