import { Document, Schema, model, models } from 'mongoose'
import { BoardDocument } from './Board'
import { CardDocument } from './Card'

export interface ListDocument extends Document {
  title: string
  description: string
  position: number
  board: BoardDocument['_id']
  cards: CardDocument['_id'][]
}

const schema = new Schema<ListDocument>(
  {
    title: String,
    description: String,
    position: Number,
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
  },
  { timestamps: true }
)

export const List = models.List || model<ListDocument>('List', schema)
