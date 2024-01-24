import { NextFunction, Request, Response } from 'express'

type AsyncFunction<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>

export const catchError =
  <T>(fn: AsyncFunction<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
