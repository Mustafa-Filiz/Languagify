import { Request, Response, NextFunction } from 'express'
import querystring from 'querystring'
import customFetch from '../utils/customFetch'
import { SpotifyProfileSchema } from '../types/SpotifyProfile'
import { catchError } from '../utils/catchError'

const STATE_KEY = 'spotify_auth_state'

const loginSpotify = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const state = Math.random().toString(36)

    res.cookie(STATE_KEY, state)

    const params = {
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      response_type: 'code',
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      scope: process.env.SPOTIFY_SCOPES!,
      state,
    }

    const queryParams = querystring.stringify(params)

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
  }
)

const spotifyCallback = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    var code = req.query.code || null
    var state = req.query.state || null
    var storedState = req.cookies ? req.cookies[STATE_KEY] : null

    if (state === null || state !== storedState) {
      res.send(
        JSON.stringify({
          error: 'state_mismatch',
        })
      )
    } else {
      res.clearCookie(STATE_KEY)

      const spotifyResponse = await fetch(process.env.SPOTIFY_TOKEN_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID! +
                ':' +
                process.env.SPOTIFY_CLIENT_SECRET!
            ).toString('base64'),
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${process
          .env.SPOTIFY_REDIRECT_URI!}`,
      })

      const spotifyResponseJson = await spotifyResponse.json()

      if (spotifyResponse.status === 200) {
        const access_token = spotifyResponseJson?.access_token
        const refresh_token = spotifyResponseJson?.refresh_token

        res.cookie('spotify_access_token', access_token)
        res.cookie('spotify_refresh_token', refresh_token)

        res.redirect(`${process.env.FRONTEND_URL!}`)
      } else {
        res.send({
          error: 'invalid_token',
        })
      }
    }
  }
)

const getSpotifyProfile = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await customFetch(
      `${process.env.SPOTIFY_API_URL}/me`,
      SpotifyProfileSchema,
      {
        init: {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${req.cookies.spotify_access_token}`,
          },
        },
      }
    )

    console.log('🤖 ~ response:', response)

    res.send(response)
  }
)

export { loginSpotify, spotifyCallback, getSpotifyProfile }
