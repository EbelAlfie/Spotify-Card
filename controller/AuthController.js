import axios from "axios"
import { createProxyMiddleware, responseInterceptor } from "http-proxy-middleware"

export const authorizeUser = () => {
    const CLIENT_ID = process.env.CLIENT_ID ?? ""
    const scope = `
    user-read-playback-state
     user-read-currently-playing 
     user-read-recently-played
    `
    const param = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: "http://localhost:3030/last-track",
    }
    
    const queryParam = new URLSearchParams(param).toString()

    return createProxyMiddleware({
        target: `https://accounts.spotify.com/authorize?${queryParam}`,
        changeOrigin: true,
        // selfHandleResponse: true,
        on: {
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {

                const response = responseBuffer.toString('utf8');
                console.log(response)
                return response.replaceAll('Example', 'Teapot');
            }),
        }
      }
    )
}