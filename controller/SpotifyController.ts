import { Request, Response } from "express"
import { getSpotifyPlayerCard } from "../card/SpotifyCard"
import { TokenUseCase } from "../domain/TokenUseCase"
import { TrackUseCase } from "../domain/TrackUseCase"
import { TokenRepository } from "../service/TokenRepository"
import { TrackRepository } from "../service/TrackRepository"
import { ClientTokenEntity, TokenEntity } from "../domain/entity/TokenEntity"
import { TrackEntity } from "../domain/entity/TrackEntity"

type ResponseModel<data> = data|Error 

const tokenHandler = async (response: Response) => {
    const tokenRepository = new TokenRepository()
    const tokenUseCase = new TokenUseCase(tokenRepository)

    const tokenObj: ResponseModel<TokenEntity> = await tokenUseCase.fetchAccessToken()

    if (!tokenObj || tokenObj instanceof Error) {
        response.status(500)
        response.send(tokenObj.message)
        return {}
    }

    const clientToken: ResponseModel<ClientTokenEntity> = await tokenUseCase.fetchClientToken({
        clientId: tokenObj.clientId
    })
    if (!clientToken || clientToken instanceof Error) {
        response.status(500)
        response.send(clientToken)
        return {}
    }
    
    return {
        clientToken: clientToken ?? {},
        tokenObj: tokenObj ?? {}
    }
}

export const getSpotifyCard = async (request: Request, response: Response) => {
    const {clientToken, tokenObj} = await tokenHandler(response)
    if (!clientToken || !tokenObj) return

    const trackRepository = new TrackRepository(clientToken, tokenObj)
    const trackUseCase = new TrackUseCase(trackRepository)

    const trackResult: ResponseModel<TrackEntity> = await trackUseCase.getTrackById({
        trackId: "0MJ5wsGpqu0gTJkx53ewxc"
    })

    if (!trackResult || trackResult instanceof Error) {
        response.status(500)
        response.send(trackResult.message)
        return
    }

    const image = trackResult.images[0].url ?? ""

    const spotifyCard = getSpotifyPlayerCard(
        {
            imageUrl: image, 
            songTitle: trackResult.name, 
            artists: trackResult.artists.map(item => item.name).join(", "),
            audioUrl: trackResult.previewUrl
        }
    )

    response.status(200)
    response.send(spotifyCard)
}