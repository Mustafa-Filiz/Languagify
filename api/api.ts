import express from 'express'
import spotifyRoutes from './routes/spotifyRoutes'
import userRoutes from './routes/userRoutes'

const api = express.Router()

api.use('/spotify', spotifyRoutes)
api.use('/user', userRoutes)

export default api
