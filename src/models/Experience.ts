import mongoose, { Document, Schema } from 'mongoose'

export interface IExperience extends Document {
  company: string
  position: string
  description: string
  technologies: string[]
  startDate: Date
  endDate?: Date
  current: boolean
  location?: string
  companyUrl?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const ExperienceSchema = new Schema<IExperience>({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    trim: true
  },
  companyUrl: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Create index for ordering experiences
ExperienceSchema.index({ order: 1, startDate: -1 })

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema)