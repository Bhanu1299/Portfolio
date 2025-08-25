import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  subject?: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  subject: {
    type: String,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Create indexes for efficient querying
ContactSchema.index({ status: 1, createdAt: -1 })
ContactSchema.index({ email: 1 })

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)