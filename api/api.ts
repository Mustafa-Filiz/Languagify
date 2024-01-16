import express from 'express'
import spotifyRoutes from './routes/spotifyRoutes'

const api = express.Router()

api.use('/spotify', spotifyRoutes)

export default api
