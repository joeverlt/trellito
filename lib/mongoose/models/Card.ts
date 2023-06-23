import { Document, Schema, model, models } from 'mongoose'
import { ListDocument } from './List'

export interface CardDocument extends Document {
  title: string
  description: string
  position: number
  list: ListDocument['_id']
}

const schema = new Schema<CardDocument>(
  {
    title: String,
    description: String,
    position: Number,
    list: { type: Schema.Types.ObjectId, ref: 'List' }
  },
  { timestamps: true }
)

export const Card = models.Card || model<CardDocument>('Card', schema)
