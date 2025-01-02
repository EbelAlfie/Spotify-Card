export class MediaSourceManager {
    mediaSource = null

    initMediaSource() {
        this.mediaSource = new MediaSource,
        this.mediaSource.addEventListener("sourceopen", this._onSourceOpen),
        this.mediaSource.addEventListener("sourceclose", this._onSourceClose),
        this.sourceBuffers = {},
        this.currentInitSegments = {}
        return this.mediaSource
    }
}