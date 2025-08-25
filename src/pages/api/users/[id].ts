import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { User } from '../../../models'
import mongoose from 'mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ success: false, error: 'Invalid user ID' })
  }

  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findById(id).select('-password').lean()
        
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' })
        }
        
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch user' })
      }
      break

    case 'PUT':
      try {
        // Don't allow password updates through this route
        const { password, ...updateData } = req.body
        
        const user = await User.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        ).select('-password').lean()
        
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' })
        }
        
        res.status(200).json({ success: true, data: user })
      } catch (error: any) {
        if (error.code === 11000) {
          res.status(400).json({ success: false, error: 'Email already exists' })
        } else {
          res.status(400).json({ success: false, error: 'Failed to update user' })
        }
      }
      break

    case 'DELETE':
      try {
        const user = await User.findByIdAndDelete(id)
        
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' })
        }
        
        res.status(200).json({ success: true, message: 'User deleted successfully' })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete user' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}