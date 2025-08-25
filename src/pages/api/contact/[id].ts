import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb'
import { Contact } from '../../../models'
import mongoose from 'mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ success: false, error: 'Invalid contact ID' })
  }

  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const contact = await Contact.findById(id).lean()
        
        if (!contact) {
          return res.status(404).json({ success: false, error: 'Contact not found' })
        }
        
        res.status(200).json({ success: true, data: contact })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch contact' })
      }
      break

    case 'PUT':
      try {
        // Only allow updating status and other admin fields
        const allowedFields = ['status']
        const updateData: any = {}
        
        Object.keys(req.body).forEach(key => {
          if (allowedFields.includes(key)) {
            updateData[key] = req.body[key]
          }
        })
        
        const contact = await Contact.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        ).lean()
        
        if (!contact) {
          return res.status(404).json({ success: false, error: 'Contact not found' })
        }
        
        res.status(200).json({ success: true, data: contact })
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to update contact' })
      }
      break

    case 'DELETE':
      try {
        const contact = await Contact.findByIdAndDelete(id)
        
        if (!contact) {
          return res.status(404).json({ success: false, error: 'Contact not found' })
        }
        
        res.status(200).json({ success: true, message: 'Contact deleted successfully' })
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete contact' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }
}