import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { Skill } from '../../../models'
import mongoose from 'mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ success: false, error: 'Invalid skill ID' })
  }

  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const skill = await Skill.findById(id).lean()
        
        if (!skill) {
          return res.status(404).json({ success: false, error: 'Skill not found' })
        }
        
        res.status(200).json({ success: true, data: skill })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch skill' })
      }
      break

    case 'PUT':
      try {
        const skill = await Skill.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        ).lean()
        
        if (!skill) {
          return res.status(404).json({ success: false, error: 'Skill not found' })
        }
        
        res.status(200).json({ success: true, data: skill })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to update skill' })
      }
      break

    case 'DELETE':
      try {
        const skill = await Skill.findByIdAndDelete(id)
        
        if (!skill) {
          return res.status(404).json({ success: false, error: 'Skill not found' })
        }
        
        res.status(200).json({ success: true, message: 'Skill deleted successfully' })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete skill' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}