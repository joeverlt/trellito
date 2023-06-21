import { Document, Schema, model, models } from 'mongoose'
import { UserDocument } from './User'

export interface BoardDocument extends Document {
  title: string
  description: string
  owner: UserDocument['_id']
}

const schema = new Schema<BoardDocument>(
  {
    title: String,
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

export const Board = models.Board || model<BoardDocument>('Board', schema)
