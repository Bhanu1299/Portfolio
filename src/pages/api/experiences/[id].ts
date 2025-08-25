import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { Experience } from '../../../models'
import mongoose from 'mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ success: false, error: 'Invalid experience ID' })
  }

  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const experience = await Experience.findById(id).lean()
        
        if (!experience) {
          return res.status(404).json({ success: false, error: 'Experience not found' })
        }
        
        res.status(200).json({ success: true, data: experience })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch experience' })
      }
      break

    case 'PUT':
      try {
        const experience = await Experience.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        ).lean()
        
        if (!experience) {
          return res.status(404).json({ success: false, error: 'Experience not found' })
        }
        
        res.status(200).json({ success: true, data: experience })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to update experience' })
      }
      break

    case 'DELETE':
      try {
        const experience = await Experience.findByIdAndDelete(id)
        
        if (!experience) {
          return res.status(404).json({ success: false, error: 'Experience not found' })
        }
        
        res.status(200).json({ success: true, message: 'Experience deleted successfully' })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete experience' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}