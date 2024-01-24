import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import PasswordUtil from '../utils/PasswordUtil'
import TokenUtil from '../utils/TokenUtil'
import { catchError } from '../utils/catchError'

const createUser = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: PasswordUtil.hash(password),
      token: TokenUtil.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    })

    res.cookie('langify_token', newUser.token)
    return res.status(201).send(newUser)
  }
)

const login = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const user = await User.findOne({
      where: {
        email,
      },
      attributes: { include: ['password'] },
    })

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    const isPasswordValid = PasswordUtil.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Password is incorrect' })
    }

    user.token = TokenUtil.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })

    await user.save()

    res.cookie('langify_token', user.token)
    res.send(user)
  }
)

const me = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.send(req.user)
  }
)

const logout = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    req.user.token = null
    await req.user.save()
    return res.send({ message: 'Logout successfully' })
  }
)

export { createUser, login, me, logout }
