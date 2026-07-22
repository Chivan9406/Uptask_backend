import { Request, Response } from 'express'
import User, { IUser } from '../models/User'
import { hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body

      const userExists = await User.findOne({ email })

      if (userExists) {
        const error = new Error('El email ya está registrado')
        return res.status(409).json({ error: error.message })
      }

      const user = new User(req.body)
      user.password = await hashPassword(password)

      const token = new Token()
      token.token = generateToken()
      token.user = user._id

      await AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      })

      await Promise.allSettled([user.save(), token.save()])
      res.send('Cuenta creada. Revisa tu email para verificar tu cuenta')
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la cuenta' })
    }
  }

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body
      const tokenExists = await Token.findOne({ token })

      if (!tokenExists) {
        const error = new Error('Token no válido')
        return res.status(401).json({ error: error.message })
      }

      const user: IUser = await User.findById(tokenExists.user)
      user.confirmed = true

      await Promise.allSettled([user.save(), tokenExists.deleteOne()])
      res.send('Cuenta confirmada exitosamente')
    } catch (error) {
      res.status(500).json({ error: 'Error al confirmar la cuenta' })
    }
  }
}
