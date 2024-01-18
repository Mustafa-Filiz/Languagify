import express from 'express'
import validate from '../middlewares/validate'
import { createUser, login } from '../controllers/userControllers'
import { UserLoginSchema, UserSingUpSchema } from '../models/user'

const router = express.Router()

router.post('/create', validate(UserSingUpSchema), createUser)
router.post('/login', validate(UserLoginSchema), login)

export default router
