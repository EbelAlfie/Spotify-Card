import { axiosRetry } from "./AxiosRetry";

export class AudioRepository {

    getCDNURL(fileId, e) {
        $e.info("Requesting CDN URL for ", fileId);
        const n = "files/audio/interactive"
          , o = `https://gew4-spclient.spotify.com/storage-resolve/${e ? `v2/${n}/${e}/${fileId}` : `${n}/${fileId}`}?version=10000000&product=9&platform=39&alt=json`;
        
        const config = {}

        return axiosRetry.request(config)
    }

    getJsonManifest(fileId) {
        const url = `https://seektables.scdn.co/seektable/${fileId}.json`
    }
}