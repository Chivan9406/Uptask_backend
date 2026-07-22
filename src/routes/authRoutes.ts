import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'

const router: Router = Router()

router.post(
  '/create-account',
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña es demasiado corta. Mínimo 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden')
    }
    return true
  }),
  body('email').isEmail().withMessage('El email no es válido'),
  handleInputErrors,
  AuthController.createAccount
)

export default router
