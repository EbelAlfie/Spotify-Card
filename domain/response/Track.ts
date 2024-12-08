import { Artist } from "./Artist"
import { Image } from "./Image"

export type TrackResponse = {
    tracks: Track[]
}

export type Track = {
    album: Album
    artists: Artist[]
    trackId: string
    name: string
    uri: string
    previewUrl: string
}

export type Album = {
    images: Image[]
}