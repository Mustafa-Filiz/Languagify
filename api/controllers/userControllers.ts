import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import PasswordUtil from '../utils/PasswordUtil'
import TokenUtil from '../utils/TokenUtil'

async function createUser(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, password } = req.body

  try {
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

    return res.status(201).json(newUser)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: `Something went wrong ${error}` })
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email,
    },
    attributes: { include: ['password'] },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const isPasswordValid = PasswordUtil.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Password is incorrect' })
  }

  user.token = TokenUtil.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })

  await user.save()

  res.send(user)
}

async function me(req: Request, res: Response, next: NextFunction) {
  return res.send(req.user)
}

export { createUser, login, me }
