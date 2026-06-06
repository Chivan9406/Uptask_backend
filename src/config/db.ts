import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'node:process'

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL)
    const url = `${ connection.host }:${ connection.port }`
    console.log(colors.blue.bold(`MongoDB connection started at: ${ url }}`))
  } catch (e) {
    console.log(colors.red.bold(e.message))
    console.log(colors.red.bold('MongoDB connection failed'))
    exit(1)
  }
}