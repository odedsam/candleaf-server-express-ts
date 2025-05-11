import { Request, Response, NextFunction } from 'express'
import jwt, {JwtPayload, VerifyErrors} from 'jsonwebtoken'
import { ENV } from '../config/env'
import { AuthenticatedRequest, UserPayload } from '../types'

type Decoded = string | JwtPayload | undefined

export const authGuard = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  jwt.verify(token, ENV.JWT_SECRET, (err:VerifyErrors | null, decoded:Decoded ) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    }

    (req as any).user = decoded as UserPayload
    next()
  })

}






export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction)=> {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Forbidden')
  }
  next()
}
