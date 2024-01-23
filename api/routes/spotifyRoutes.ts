import {
  getSpotifyProfile,
  loginSpotify,
  spotifyCallback,
} from '../controllers/spotifyControllers'
import express from 'express'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

router.get('/connect', verifyToken, loginSpotify)
router.get('/callback', verifyToken, spotifyCallback)
router.get('/me', verifyToken, getSpotifyProfile)

export default router
