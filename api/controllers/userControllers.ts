import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import hashPassword from '../utils/hashPassword'
import comparePassword from '../utils/comparePassword'

async function createUser(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, password } = req.body

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword(password),
    })

    user.save()

    return res.status(201).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const isPasswordValid = comparePassword(password, user.password)

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Password is incorrect' })
  }

  res.send(user)
}

export { createUser, login }
