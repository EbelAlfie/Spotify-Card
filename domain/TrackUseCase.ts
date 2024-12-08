import { TrackRepository } from "../service/TrackRepository"
import { TrackEntity } from "./entity/TrackEntity"
import { TrackRequest } from "./models/Request"
import { Album } from "./response/Track"

export class TrackUseCase {
    repository: TrackRepository

    constructor(trackRepository: TrackRepository) {
        if (!trackRepository) 
            throw Error("No repository provided")
        this.repository = trackRepository
    }

    async getLastDeviceState() {
        return this.repository.getLastDeviceState()
    }

    async getTrackById(params: TrackRequest): Promise<TrackEntity> {
        const {trackId} = params

        return this.repository.getTrackById(trackId)
        .then(result => {
            const tracks = result.data.tracks
            const firstTrack = tracks[0] 
            const album: Album = firstTrack.album

            const trackId = firstTrack.id || ""
            const artists = firstTrack.artists || ""
            const images = album.images || []

            const name = firstTrack.name || ""
            const uri = firstTrack.uri || ""
            const previewUrl = firstTrack.preview_url || ""

            const mapped: TrackEntity = {
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
            return error
        })
    }
}