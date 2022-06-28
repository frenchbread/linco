import { Schema, model } from 'mongoose'

interface IVisit {
  hash_ref: string
  visited_at: Date
}

const visitSchema = new Schema<IVisit>({
  hash_ref: String,
  visited_at: {
    type: Date,
    default: Date.now,
    required: true
  }
})

export default model<IVisit>('Visit', visitSchema)
