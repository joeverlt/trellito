import { Document, Schema, model, models } from 'mongoose'
import { BoardDocument } from './Board'

export interface ListDocument extends Document {
  title: string
  position: number
  board: BoardDocument['_id']
}

const schema = new Schema<ListDocument>(
  {
    title: String,
    position: Number,
    board: { type: Schema.Types.ObjectId, ref: 'Board' }
  },
  { timestamps: true }
)

export const List = models.List || model<ListDocument>('List', schema)
