import { Request, Response, NextFunction } from 'express'

async function createUser(req: Request, res: Response, next: NextFunction) {
  res.send('Hello New User')
}

export { createUser }
