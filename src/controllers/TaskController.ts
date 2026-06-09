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
      res.json(req.task)
    } catch (e) {
      res.status(500).json({ error: 'Error al obtener la tarea' })
    }
  }

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name
      req.task.description = req.body.description
      await req.task.save()
      res.send('Tarea actualizada exitosamente')
    } catch (e) {
      res.status(500).json({ error: 'Error al actualizar la tarea' })
    }
  }

  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(task => task._id.equals(req.task._id))

      await Promise.allSettled([req.task.deleteOne(), req.project.save()])

      res.send('Tarea eliminada exitosamente')
    } catch (e) {
      res.status(500).json({ error: 'Error al actualizar la tarea' })
    }
  }

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body
      req.task.status = status
      await req.task.save()
      res.send('Estado de la tarea actualizado exitosamente')
    } catch (e) {
      res.status(500).json({ error: 'Error al actualizar el estado de la tarea' })
    }
  }
}
