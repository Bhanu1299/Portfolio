import mongoose, { Document, Schema } from 'mongoose'

export interface ISkill extends Document {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience?: number
  iconUrl?: string
  order: number
  visible: boolean
  createdAt: Date
  updatedAt: Date
}

const SkillSchema = new Schema<ISkill>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'database', 'tools', 'other']
  },
  proficiency: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'expert']
  },
  yearsOfExperience: {
    type: Number,
    min: 0
  },
  iconUrl: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  visible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Create indexes for efficient querying
SkillSchema.index({ category: 1, order: 1 })
SkillSchema.index({ visible: 1, category: 1 })

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema)