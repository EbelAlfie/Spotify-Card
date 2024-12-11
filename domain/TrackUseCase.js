export class TrackUseCase {
    constructor(trackRepository) {
        if (!trackRepository) 
            throw Error("No repository provided")
        this.repository = trackRepository
    }

    async getCurrentPlayingTrack() {
        return this.repository.getCurrentPlayingTrack()
        .then(response => {
            
            const track = response.data.item
            const data = response.data
            console.log(data)

            const album = track.album

            const trackId = track.id
            const artists = track.artists
            const images = album.images

            const name = track.name
            const uri = track.uri
            const previewUrl = track.preview_url
            const isPlaying = data.is_playing
            const isPaused = data.is_paused

            const progress = data.progress_ms ?? 0
            const trackDuration = track.duration_ms ?? 0

            const mapped = {
                trackId: trackId ?? "",
                artists: artists ?? [],
                images: images ?? [],
                name: name ?? "",
                uri: uri ?? "",
                previewUrl: previewUrl ?? "",
                isPlaying: (isPlaying && !isPaused) ?? false,
                refresh: trackDuration - progress ?? 0
            }
            return mapped 
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }

    async getTrackById(params) {
        const {
            trackId = ""
        } = params

        return this.repository.getTrackById(trackId)
        .then(response => {
            console.log(JSON.stringify(response.data));
            
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