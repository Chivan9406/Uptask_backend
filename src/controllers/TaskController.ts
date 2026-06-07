import { Request, Response } from 'express'
import Task from '../models/Task'

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body)
      task.project = req.project._id
      req.project.tasks.push(task._id)
      await Promise.allSettled([task.save(), req.project.save()])
      res.send('Tarea creada exitosamente')
    } catch (e) {
      res.status(500).json({ error: 'Error al crear la tarea' })
    }
  }

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project._id }).populate('project')
      res.json(tasks)
    } catch (e) {
      res.status(500).json({ error: 'Error al obtener las tareas' })
    }
  }

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)

      if (!task) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ error: error.message })
      }

      if (!task.project.equals(req.project._id)) {
        const error = new Error('Acción no válida')
        return res.status(400).json({ error: error.message })
      }

      res.json(task)
    } catch (e) {
      res.status(500).json({ error: 'Error al obtener la tarea' })
    }
  }
}
