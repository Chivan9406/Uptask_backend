import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middleware/project'
import { taskBelongsToProject, validateTaskExists } from '../middleware/task'

const router: Router = Router()

router.post(
  '/',
  body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description').notEmpty().withMessage('La descripción del proyecto es obligatorio'),
  handleInputErrors,
  ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get(
  '/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.getProjectById
)

router.put(
  '/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
  body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
  body('description').notEmpty().withMessage('La descripción del proyecto es obligatorio'),
  handleInputErrors,
  ProjectController.updateProject
)

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.deleteProject
)

router.post(
  '/:projectId/tasks',
  param('projectId').isMongoId().withMessage('ID de proyecto no válido'),
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description').notEmpty().withMessage('La descripción de la tarea es obligatorio'),
  handleInputErrors,
  validateProjectExists,
  TaskController.createTask
)

router.get(
  '/:projectId/tasks',
  param('projectId').isMongoId().withMessage('ID de proyecto no válido'),
  handleInputErrors,
  validateProjectExists,
  TaskController.getProjectTasks
)

router.get(
  '/:projectId/tasks/:taskId',
  param('projectId').isMongoId().withMessage('ID de proyecto no válido'),
  param('taskId').isMongoId().withMessage('ID de tarea no válido'),
  handleInputErrors,
  validateProjectExists,
  validateTaskExists,
  taskBelongsToProject,
  TaskController.getTaskById
)

router.put(
  '/:projectId/tasks/:taskId',
  param('projectId').isMongoId().withMessage('ID de proyecto no válido'),
  param('taskId').isMongoId().withMessage('ID de tarea no válido'),
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description').notEmpty().withMessage('La descripción de la tarea es obligatorio'),
  handleInputErrors,
  validateProjectExists,
  validateTaskExists,
  taskBelongsToProject,
  TaskController.updateTask
)

router.delete(
  '/:projectId/tasks/:taskId',
  param('projectId').isMongoId().withMessage('ID de proyecto no válido'),
  param('taskId').isMongoId().withMessage('ID de tarea no válido'),
  handleInputErrors,
  validateProjectExists,
  validateTaskExists,
  taskBelongsToProject,
  TaskController.deleteTask
)

router.post(
  '/:projectId/tasks/:taskId/status',
  param('projectId').isMongoId().withMessage('ID de proyecto no válido'),
  param('taskId').isMongoId().withMessage('ID de tarea no válido'),
  body('status').notEmpty().withMessage('El estado de la tarea es obligatorio'),
  handleInputErrors,
  validateProjectExists,
  validateTaskExists,
  taskBelongsToProject,
  TaskController.updateStatus
)

export default router
