import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { Experience } from '../../../models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const experiences = await Experience.find({})
          .sort({ order: 1, startDate: -1 })
          .lean()
        
        res.status(200).json({ success: true, data: experiences })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch experiences' })
      }
      break

    case 'POST':
      try {
        const experience = await Experience.create(req.body)
        res.status(201).json({ success: true, data: experience })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to create experience' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}