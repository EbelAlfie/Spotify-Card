import { httpHandler } from "./apiUtil/HttpHandler.js";

export class TrackRepository {

    async getTrackById(trackId) {
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            headers: {},
            url: `https://api.spotify.com/v1/tracks?ids=${trackId}&market=from_token`
        };

        return httpHandler
            .init(config)
            .withAuthHeader()
            .request()
    }
}