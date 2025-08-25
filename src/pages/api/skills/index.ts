import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { Skill } from '../../../models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const { category, visible } = req.query
        let query: any = {}
        
        if (category) {
          query.category = category
        }
        
        if (visible !== undefined) {
          query.visible = visible === 'true'
        }
        
        const skills = await Skill.find(query)
          .sort({ category: 1, order: 1, name: 1 })
          .lean()
        
        res.status(200).json({ success: true, data: skills })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch skills' })
      }
      break

    case 'POST':
      try {
        const skill = await Skill.create(req.body)
        res.status(201).json({ success: true, data: skill })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to create skill' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}