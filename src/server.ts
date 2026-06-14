import express, { Express } from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db'
import projectRoutes from './routes/projectRoutes'
import cors from 'cors'
import { corsConfig } from './config/cors'
import morgan from 'morgan'

dotenv.config()
connectDb()

const app: Express = express()

app.use(cors(corsConfig))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/projects', projectRoutes)

export default app
