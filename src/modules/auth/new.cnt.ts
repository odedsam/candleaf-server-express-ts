// controllers/auth.ts
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/User'
import { verifyGoogleToken } from '../utils'
import { ENV } from '../config/env'

export const handleGoogleLogin = async (req: Request, res: Response) => {
  const { token } = req.body

  const googleUser = await verifyGoogleToken(token)
  if (!googleUser) return res.status(401).json({ message: 'Invalid Google Token' })

  const user = await UserModel.findOneAndUpdate(
    { email: googleUser.email },
    {
      name: googleUser.name,
      image: googleUser.picture,
    },
    { new: true, upsert: true }
  )

  const jwtToken = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_LIFETIME })

  res.status(200).json({ user, token: jwtToken })
}

export const handleLocalLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email })
  if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).json({ message: 'Wrong password' })

  const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_LIFETIME })
  res.status(200).json({ user, token })
}

export const handleRegister = async (req: Request, res: Response) => {
  const { email, password, name } = req.body

  const exists = await UserModel.findOne({ email })
  if (exists) return res.status(409).json({ message: 'User already exists' })

  const hash = await bcrypt.hash(password, 10)
  const user = await UserModel.create({ email, password: hash, name })

  const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_LIFETIME })
  res.status(201).json({ user, token })
}


// routes/auth.routes.ts
// import { Router } from 'express'
// import {
//   handleGoogleLogin,
//   handleLocalLogin,
//   handleRegister
// } from '../controllers/auth'

// const router = Router()

// router.post('/auth/google', handleGoogleLogin)
// router.post('/auth/login', handleLocalLogin)
// router.post('/auth/register', handleRegister)

// export default router


// register locally logics 

// export const handleRegister = async (req: Request, res: Response) => {
//   const { email, password, name } = req.body

//   const exists = await UserModel.findOne({ email })
//   if (exists) return res.status(409).json({ message: 'User already exists' })

//   const hash = await bcrypt.hash(password, 10)
//   const user = await UserModel.create({ email, password: hash, name })

//   const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_LIFETIME })
//   res.status(201).json({ user, token })
// }


// login locally logic 


// export const handleLocalLogin = async (req: Request, res: Response) => {
//   const { email, password } = req.body

//   const user = await UserModel.findOne({ email })
//   if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' })

//   const isMatch = await bcrypt.compare(password, user.password)
//   if (!isMatch) return res.status(401).json({ message: 'Wrong password' })

//   const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_LIFETIME })
//   res.status(200).json({ user, token })
// }
