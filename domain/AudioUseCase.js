export class AudioUseCase {
    constructor(audioRepository) {
        if (!audioRepository) 
            throw Error("No repository provided")
        this.repository = audioRepository
    }

    getCDNURL() {
        return this.repository.getCDNURL()
    }
}