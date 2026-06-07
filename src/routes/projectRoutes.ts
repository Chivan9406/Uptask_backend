import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middleware/project'

const router: Router = Router()

router.post('/',
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('La dsescripción del proyecto es obligatorio'),
  handleInputErrors,
  ProjectController.createProject)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
  param('id')
    .isMongoId().withMessage('ID no válido'),
  handleInputErrors, 
  ProjectController.getProjectById)

router.put('/:id',
  param('id')
    .isMongoId().withMessage('ID no válido'),
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty().withMessage('La dsescripción del proyecto es obligatorio'),
  handleInputErrors,
  ProjectController.updateProject)

router.delete('/:id',
  param('id')
    .isMongoId().withMessage('ID no válido'),
  handleInputErrors, 
  ProjectController.deleteProject)

  router.post('/:projectId/tasks',
  param('projectId')
    .isMongoId().withMessage('ID de proyecto no válido'),
  body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description')
    .notEmpty().withMessage('La dsescripción de la tarea es obligatorio'),
  handleInputErrors,
  validateProjectExists,
  TaskController.createTask)

export default router