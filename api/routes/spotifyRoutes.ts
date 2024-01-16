import { getAccessToken } from '../controllers/spotifyControllers'
import express from 'express'

const router = express.Router()

router.get('/access_token', getAccessToken)

export default router
