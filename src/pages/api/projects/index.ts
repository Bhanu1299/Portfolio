import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { Project } from '../../../models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const { featured } = req.query
        let query = {}
        
        if (featured === 'true') {
          query = { featured: true }
        }
        
        const projects = await Project.find(query)
          .sort({ featured: -1, order: 1, createdAt: -1 })
          .lean()
        
        res.status(200).json({ success: true, data: projects })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch projects' })
      }
      break

    case 'POST':
      try {
        const project = await Project.create(req.body)
        res.status(201).json({ success: true, data: project })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to create project' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}