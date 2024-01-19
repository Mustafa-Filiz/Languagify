import express from 'express'
import validate from '../middlewares/validate'
import { createUser, login, logout, me } from '../controllers/userControllers'
import { UserLoginSchema, UserSingUpSchema } from '../models/user'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

router.post('/create', validate(UserSingUpSchema), createUser)
router.post('/login', validate(UserLoginSchema), login)
router.get('/me', verifyToken, me)
router.get('/logout', verifyToken, logout)

export default router
