import {
  getAccessToken,
  loginSpotify,
  spotifyCallback,
} from '../controllers/spotifyControllers'
import express from 'express'

const router = express.Router()

router.get('/access_token', getAccessToken)
router.get('/connect', loginSpotify)
router.get('/callback', spotifyCallback)

export default router
