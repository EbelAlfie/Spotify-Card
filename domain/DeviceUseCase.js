export class DeviceUseCase {
    constructor(repository) {
        if (!repository) 
            throw Error("No repository provided")

        this.repository = repository
    }

    async connectDevice() {
        return this.repository.connectDevice()
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
}