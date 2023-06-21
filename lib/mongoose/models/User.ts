import { Schema, model, models, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  comparePassword: (password: string) => Promise<boolean>
  encryptPassword: () => Promise<void>
}

const schema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

schema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const compare = await bcrypt.compare(password, this.password)
  return compare
}

schema.methods.encryptPassword = async function (): Promise<void> {
  const salt: string = bcrypt.genSaltSync()
  this.password = bcrypt.hashSync(this.password, salt)
}

export const User = models.User || model<UserDocument>('User', schema)
