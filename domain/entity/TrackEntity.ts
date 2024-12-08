import { Artist } from "../response/Artist"
import { Image } from "../response/Image"

export type TrackEntity = {
    trackId: string,
    artists: Artist[],
    images: Image[],
    name: string,
    uri: string,
    previewUrl: string
}