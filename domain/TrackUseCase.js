export class TrackUseCase {
    constructor(trackRepository) {
        if (!trackRepository) 
            throw Error("No repository provided")
        this.repository = trackRepository
    }

    async getLastDeviceState() {
        return this.repository.getLastDeviceState()
        .then(response => {            
            const playerState = response.data.player_state

            const isPlaying = playerState.is_playing  ?? false
            const isPaused = playerState.is_paused  ?? false
            const track = playerState?.track

            const uri = track?.uri?.replace("spotify:track:", "")
            const mappedData = {
                isPlaying: (isPlaying && !isPaused),
                trackUri: uri ?? ""
            }

            return mappedData
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