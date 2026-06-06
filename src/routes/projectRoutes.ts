import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'

const router: Router = Router()

router.post('/', ProjectController.createProject)
router.get('/', ProjectController.getAllProjects)

export default router