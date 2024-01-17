import express from 'express'
import validate from '../middlewares/validate'
import { createUser } from '../controllers/userControllers'
import { userSchema } from '../models/user'

const router = express.Router()

router.post('/create', validate(userSchema), createUser)

export default router
