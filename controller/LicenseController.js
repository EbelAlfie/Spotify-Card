import { AudioUseCase } from "../domain/AudioUseCase.js"
import { AudioRepository } from "../service/AudioRepository.js"
import { isError } from "./utils/Utils.js"

export async function getLicense(request, response) {
    const message = request.body ?? {}

    const audioRepository = new AudioRepository()
    const audioUseCase = new AudioUseCase(audioRepository)

    const license = await audioUseCase.fetchLicense(message)

    if (isError(license, response, false)) return

    response.status(200)
    response.set(license.header)
    response.send(license.data)
}