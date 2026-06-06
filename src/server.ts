import express, { Express } from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db'
import projectRoutes from './routes/projectRoutes'

dotenv.config()
connectDb()

const app: Express = express()

app.use(express.json())

app.use('/api/projects', projectRoutes)

export default app