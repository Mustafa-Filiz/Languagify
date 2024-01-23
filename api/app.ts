import path from 'path'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import api from './api'
import cookieParser from 'cookie-parser'

// libraries and frameworks
const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use((req, res, next) => {
  express.json()(req, res, next)
})

// to parse the incoming requests in urlencodedform
app.use(express.urlencoded({ extended: true }))
// to serve the static files
app.use(express.static(path.join(__dirname, 'public')))
// to parse cookies
app.use(cookieParser())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// redirect incoming requests to api.js
app.use('/api', api)
// app.get('/uploads', express.static('./public'))
app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`))
})

export default app
