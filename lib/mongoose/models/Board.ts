import { Document, Schema, model, models } from 'mongoose'
import { UserDocument } from './User'
import { ListDocument } from './List'

export interface BoardDocument extends Document {
  title: string
  description: string
  owner: UserDocument['_id']
  lists: ListDocument['_id'][]
}

const schema = new Schema<BoardDocument>(
  {
    title: String,
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
  },
  { timestamps: true }
)

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
})

export const Board = models.Board || model<BoardDocument>('Board', schema)
