import { Request, Response } from 'express'
import { User } from '../models/User'
import tokenize from '../utils/tokenize'

interface AuthRequest extends Request {
  user?: { [x: string]: any }
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ error: 'Username already exists' })

    const user = new User({ name, email, password })
    user.encryptPassword()

    await user.save()
    const token: string = tokenize.encode(user, '12h')
    res.status(201).json({ user: { id: user._id, name, email, token } })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user)
      return res.status(401).json({ error: 'Invalid username or password 1' })

    const isMatch = await user.comparePassword(password)
    if (!isMatch)
      return res.status(401).json({ error: 'Invalid username or password 2' })

    const token: string = tokenize.encode(user, '12h')
    res.json({ user: { id: user._id, name: user.name, email, token } })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: 'No se ha iniciado sesión' })
    const userId = req.user.id
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor' })
  }
}
