
export class DeviceUseCase {
    constructor(repository) {
        if (!repository) 
            throw Error("No repository provided")

        this.repository = repository
    }

    async registerDevice() {
        return this.repository.registerDevice()
            .then(response => {
                const data = response.data
                console.log(data)
                return response
            })
            .catch(error => {
                console.log(error)
                return error
            })
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

    async activateDevice() {
        return this.repository.activateDevice()
            .then(response => {
                const data = response.data
                console.log(data)
                return response
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }
}