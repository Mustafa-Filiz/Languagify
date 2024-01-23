import { Request, Response, NextFunction } from 'express'
import customFetch from '../utils/customFetch'
import querystring from 'querystring'

const STATE_KEY = 'spotify_auth_state'

async function getAccessToken(req: Request, res: Response, next: NextFunction) {
  const spotifyResponse = await fetch(`${process.env.SPOTIFY_TOKEN_API_URL}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
  })

  const spotifyResponseJson = await spotifyResponse.json()

  res.send(spotifyResponseJson)
}

async function loginSpotify(req: Request, res: Response, next: NextFunction) {
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

async function spotifyCallback(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

      const tokens = {
        access_token: access_token,
        refresh_token: refresh_token,
      }
      console.log('🤖 ~ tokens:', tokens)

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

export { getAccessToken, loginSpotify, spotifyCallback }
