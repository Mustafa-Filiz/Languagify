import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import hashPassword from '../utils/hashPassword'

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

export { createUser }
