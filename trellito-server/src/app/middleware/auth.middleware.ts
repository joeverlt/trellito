import tokenize from '../utils/tokenize'
import { Request, Response, NextFunction } from 'express'

type Keys = { [x: string]: any }

interface AuthRequest extends Request {
  user?: Keys
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('auth-token')
  if (token) {
    try {
      const user = tokenize.decode(token)
      req.user = user
      next()
    } catch (e) {
      res.status(401).json({ error: 'Invalid Token' })
    }
  }
}
