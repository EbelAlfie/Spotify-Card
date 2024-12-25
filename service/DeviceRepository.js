import { httpHandler } from "./apiUtil/HttpHandler.js"
import { generateDeviceIdObserver, generateRandomDeviceId } from "./Utils.js"

export class DeviceRepository {
  deviceId = 0

  constructor() {
    this.deviceId = generateRandomDeviceId()
  }

  async registerDevice() {
    const url = `https://gew4-spclient.spotify.com/track-playback/v1/devices`
    
    let data = JSON.stringify({
      "device": {
        "brand": "spotify",
        "capabilities": {
          "change_volume": true,
          "enable_play_token": true,
          "supports_file_media_type": true,
          "play_token_lost_behavior": "pause",
          "disable_connect": false,
          "audio_podcasts": true,
          "video_playback": true,
          "manifest_formats": [
            "file_ids_mp3",
            "file_urls_mp3",
            "manifest_urls_audio_ad",
            "manifest_ids_video",
            "file_urls_external",
            "file_ids_mp4",
            "file_ids_mp4_dual",
            "manifest_urls_audio_ad"
          ]
        },
        "device_id": `${this.deviceId}`,
        "device_type": "computer",
        "metadata": {},
        "model": "web_player",
        "name": "Web Player (Microsoft Edge)",
        "platform_identifier": "web_player linux undefined;microsoft edge 131.0.0.0;desktop",
        "is_group": false
      },
      "outro_endcontent_snooping": false,
      "connection_id": `${httpHandler.connectionIdHeader}`,
      "client_version": "harmony:4.45.0-2fc85eb5",
      "volume": 65535
    });

    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: url,
      headers: {},
      data : data
    };
    
    return httpHandler
      .init(config)
      .withAuthHeader()
      .request()
  }

  async connectDevice() {
    const deviceIdObserver = generateDeviceIdObserver(this.deviceId)  

    let data = JSON.stringify({
        "member_type": "CONNECT_STATE",
        "device": {
          "device_info": {
            "capabilities": {
              "can_be_player": false,
              "hidden": true,
              "needs_full_player_state": true
            }
          }
        }
    });
      
    let config = {
        method: 'PUT',
        maxBodyLength: Infinity,
        url: `https://gew4-spclient.spotify.com/connect-state/v1/devices/${deviceIdObserver}`,
        headers: { 
            'accept': 'application/json', 
            'accept-language': 'en-US,en;q=0.9,id;q=0.8',
            'content-type': 'application/json', 
            'origin': 'https://open.spotify.com', 
            'priority': 'u=1, i', 
            'referer': 'https://open.spotify.com/', 
            'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-platform': '"Linux"', 
            'sec-fetch-dest': 'empty', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'same-site', 
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0', 
        },
        data : data
    };
    
    return httpHandler
      .init(config)
      .withAuthHeader()
      .withConnectionId()
      .request()
  }

  async activateDevice() {
    const url = 
      `https://gew4-spclient.spotify.com/connect-state/v1/connect/transfer/from/${this.deviceId}/to/${this.deviceId}`

    const data = JSON.stringify(
      {
        "transfer_options":{
          "restore_paused":"restore"
        },
        "interaction_id":"1253b28d-ee67-4df5-90d6-4ec92bca20a5",
        "command_id":"99b5c6cd06f58296d9835980a95afc7f"
      }
    )

    const config = {
        method: "POST",
        url: url,
        headers: {},
        data: data
    }

    return httpHandler
        .init(config)
        .withAuthHeader()
        .request()
  }
}