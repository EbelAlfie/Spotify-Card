export class TokenUseCase {
    constructor(repository) {
        if (!repository) 
            throw Error("No repository provided")

        this.repository = repository
    }

    async fetchAccessToken() {
        return this.repository.fetchAccessToken()
        .then(response => {
            console.log(JSON.stringify(response.data));
            
            const data = response.data

            const tokenType = data.token_type	
            const accessToken= data.access_token
            const scope = data.scope

            console.log(scope)

            const token = {
                tokenType: tokenType ?? "",
                accessToken: accessToken ?? "",
                scope: scope ?? ""
            }
            return token 
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }
}