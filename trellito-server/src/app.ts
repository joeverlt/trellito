import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import authRoutes from './app/routes/auth.routes'

dotenv.config()

const app = express()

const DBuser = process.env.DATABASE_USER
const DBpassword = process.env.DATABASE_PASSWORD
const DBdatabase = process.env.DATABASE_NAME
const DBhost = process.env.DATABASE_HOST
const DBport = process.env.DATABASE_PORT
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(
  express.json({
    limit: '250mb'
  })
)
app.use(
  express.urlencoded({
    limit: '250mb',
    parameterLimit: 500000,
    extended: true
  })
)
app.use('/api/v1/auth', authRoutes)

const url = `mongodb://${DBuser}:${DBpassword}@${DBhost}:${DBport}/${DBdatabase}?authSource=admin&directConnection=true&ssl=false`

const connection = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(url)
    console.log(' · Database connected')
  } catch (error) {
    console.log('Error: ', error)
  }
}

const server = createServer(app)
server.listen(port, async () => {
  await connection()
  console.log(` · Server running on: http://localhost:${port}`)
})
