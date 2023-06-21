import mongoose from 'mongoose'

const DBuser = process.env.DATABASE_USER
const DBpassword = process.env.DATABASE_PASSWORD
const DBdatabase = process.env.DATABASE_NAME
const DBhost = process.env.DATABASE_HOST
const DBport = process.env.DATABASE_PORT

// const url = `mongodb://${DBuser}:${DBpassword}@${DBhost}:${DBport}/${DBdatabase}?authSource=admin&directConnection=true&ssl=false`
const url = `mongodb+srv://${DBuser}:${DBpassword}@${DBhost}/${DBdatabase}?retryWrites=true&w=majority`

export const connection = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise()
    }
    console.log(' · Database connected')
    return await mongoose.connect(url)
  } catch (error) {
    console.log('Error: ', error)
  }
}
