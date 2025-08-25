import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { Contact } from '../../../models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const { status, limit = 50, page = 1 } = req.query
        let query: any = {}
        
        if (status) {
          query.status = status
        }
        
        const skip = (Number(page) - 1) * Number(limit)
        
        const contacts = await Contact.find(query)
          .sort({ createdAt: -1 })
          .limit(Number(limit))
          .skip(skip)
          .lean()
        
        const total = await Contact.countDocuments(query)
        
        res.status(200).json({ 
          success: true, 
          data: contacts,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / Number(limit))
          }
        })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch contacts' })
      }
      break

    case 'POST':
      try {
        // Get client IP and user agent for security
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        const userAgent = req.headers['user-agent']
        
        const contactData = {
          ...req.body,
          ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
          userAgent
        }
        
        const contact = await Contact.create(contactData)
        res.status(201).json({ success: true, data: contact })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to submit contact form' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}