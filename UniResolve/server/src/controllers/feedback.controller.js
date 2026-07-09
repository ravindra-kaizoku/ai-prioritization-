import { z } from 'zod'

import { Feedback } from '../models/feedback.model.js'

const schema = z.object({ complaintId: z.string(), rating: z.number().min(1).max(5), comment: z.string().min(5) })

export async function createFeedback(request, response, next) {
  try {
    const payload = schema.parse(request.body)
    const feedback = await Feedback.create({ complaint: payload.complaintId, rating: payload.rating, comment: payload.comment, user: request.user._id })
    response.status(201).json({ success: true, data: { id: feedback._id.toString(), complaintId: payload.complaintId, rating: feedback.rating, comment: feedback.comment, createdAt: feedback.createdAt } })
  } catch (error) {
    next(error)
  }
}
