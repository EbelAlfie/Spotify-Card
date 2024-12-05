class SpotifyService {

    constructor() {
        this.authorization = process.env.TOKEN
        this.clientToken = process.env.CLIENT_TOKEN 
    }

    getLastDeviceState(request) {

    }

    GetTrackById(trackId) {
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.spotify.com/v1/tracks?ids=0MJ5wsGpqu0gTJkx53ewxc&market=from_token',
        headers: { 
            'sec-ch-ua-platform': '"Linux"', 
            'authorization': '', 
            'Referer': 'https://open.spotify.com/', 
            'client-token': '', 
            'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"', 
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0', 
            'sec-ch-ua-mobile': '?0'
        }
        };

        axios.request(config)
        .then((response) => {
            onsole.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
    }
}