import { Request, Response } from 'express'
import Project from '../models/Project'

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body)

    try {
      await project.save()
      res.send('Proyecto creado exitosamente')
    } catch (e) {
      console.error(e)
    }
  }

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({})
      res.json(projects)
    } catch (e) {
      console.error(e)
    }
  }

  static getAllProjectById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const project = await Project.findById(id)

      if (!project) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({ error })
      }

      res.json(project)
    } catch (e) {
      console.error(e)
    }
  }
}