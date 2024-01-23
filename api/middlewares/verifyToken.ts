import { Request, Response, NextFunction } from 'express'
import TokenUtil from '../utils/TokenUtil'
import { User } from '../models'

export const COOKIE_NAME = 'langify_token'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.[COOKIE_NAME]

  if (!token) {
    res.clearCookie(COOKIE_NAME)
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const varifiedToken = TokenUtil.verify(token)

    const user = await User.findOne({
      where: {
        email: varifiedToken.email,
        token,
      },
    })

    if (!user) {
      res.clearCookie(COOKIE_NAME)
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.user = user

    next()
  } catch (error) {
    console.error(error)
    res.clearCookie(COOKIE_NAME)
    return res.status(500).json({ message: `Something went wrong ${error}` })
  }
}

export default verifyToken
