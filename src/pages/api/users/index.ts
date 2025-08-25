import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { User } from '../../../models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const { role, isActive } = req.query
        let query: any = {}
        
        if (role) {
          query.role = role
        }
        
        if (isActive !== undefined) {
          query.isActive = isActive === 'true'
        }
        
        // Exclude password from response
        const users = await User.find(query)
          .select('-password')
          .sort({ createdAt: -1 })
          .lean()
        
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch users' })
      }
      break

    case 'POST':
      try {
        const user = await User.create(req.body)
        
        // Remove password from response
        const userResponse = user.toObject()
        delete userResponse.password
        
        res.status(201).json({ success: true, data: userResponse })
      } catch (error: any) {
        if (error.code === 11000) {
          res.status(400).json({ success: false, error: 'Email already exists' })
        } else {
          res.status(400).json({ success: false, error: 'Failed to create user' })
        }
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}