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
      const tasks = await Task.find({ project: req.project._id })
      res.json(tasks)
    } catch (e) {
      res.status(500).json({ error: 'Error al obtener las tareas' })
    }
  }
}
