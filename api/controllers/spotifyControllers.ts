import { NextFunction, Request, Response } from 'express'

async function getAccessToken(req: Request, res: Response, next: NextFunction) {
    const spotifyResponse = await fetch(
        `${process.env.SPOTIFY_TOKEN_API_URL}`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
        }
    )

    const spotifyResponseJson = await spotifyResponse.json()

    res.send(spotifyResponseJson)
}

export { getAccessToken }
