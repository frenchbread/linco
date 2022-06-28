import { Schema, model } from 'mongoose'

interface ILink {
  original_url: string
  hash_ref: string
  created_at: Date
}

const linkSchema = new Schema<ILink>({
  original_url: {
    type: String,
    lowercase: true,
    required: true
  },
  hash_ref: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  }
})

export default model<ILink>('Link', linkSchema)
