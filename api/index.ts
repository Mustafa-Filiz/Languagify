import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, './.env') })

import ecommercedb from './models/db'

const app: Express = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
