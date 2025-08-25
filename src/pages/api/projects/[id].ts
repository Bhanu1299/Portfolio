import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { Project } from '../../../models'
import mongoose from 'mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ success: false, error: 'Invalid project ID' })
  }

  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const project = await Project.findById(id).lean()
        
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' })
        }
        
        res.status(200).json({ success: true, data: project })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch project' })
      }
      break

    case 'PUT':
      try {
        const project = await Project.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        ).lean()
        
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' })
        }
        
        res.status(200).json({ success: true, data: project })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to update project' })
      }
      break

    case 'DELETE':
      try {
        const project = await Project.findByIdAndDelete(id)
        
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' })
        }
        
        res.status(200).json({ success: true, message: 'Project deleted successfully' })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete project' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}