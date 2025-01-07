import { AudioUseCase } from "../domain/AudioUseCase.js"
import { AudioRepository } from "../service/AudioRepository.js"
import { isError, readBodyAsBuffer } from "./utils/Utils.js"

export async function getLicense(request, response) {
    const key = request.body ?? {}

    const audioRepository = new AudioRepository()
    const audioUseCase = new AudioUseCase(audioRepository)

    const license = await audioUseCase.fetchLicense(key)

    if (isError(license, response, false)) return

    response.status(200)
    response.contentType("application/octet-stream")
    response.send(license)
}