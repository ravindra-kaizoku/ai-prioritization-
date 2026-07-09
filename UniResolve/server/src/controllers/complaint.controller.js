import { z } from 'zod'

import { Complaint } from '../models/complaint.model.js'
import { Notification } from '../models/notification.model.js'
import { classifyComplaint } from '../services/ai.service.js'
import { uploadImage } from '../services/cloudinary.service.js'
import { formatComplaint } from '../utils/format.js'

const createSchema = z.object({ title: z.string().min(8), description: z.string().min(30) })
const updateSchema = z.object({ status: z.enum(['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed']).optional(), department: z.string().optional(), assignedStaff: z.string().optional() })

export async function createComplaint(request, response, next) {
  try {
    const payload = createSchema.parse(request.body)
    const ai = await classifyComplaint(payload.title, payload.description)
    const imageUrl = await uploadImage(request.file)
    const complaint = await Complaint.create({
      ...payload,
      category: ai.category,
      priority: ai.priority,
      department: ai.department,
      aiConfidence: ai.confidence,
      imageUrl,
      student: request.user._id,
      timeline: [{ label: 'Submitted', note: 'Complaint received from student portal.' }, { label: 'AI Classified', note: `Category ${ai.category}, priority ${ai.priority}.` }],
    })
    await Notification.create({ user: request.user._id, title: 'Complaint submitted', body: `${payload.title} was classified as ${ai.priority}.` })
    response.status(201).json({ success: true, data: formatComplaint(await complaint.populate('student', 'name email')) })
  } catch (error) {
    next(error)
  }
}

export async function listComplaints(request, response, next) {
  try {
    const filter = request.user.role === 'student' ? { student: request.user._id } : {}
    const complaints = await Complaint.find(filter).populate('student', 'name email').sort({ createdAt: -1 })
    response.json({ success: true, data: complaints.map(formatComplaint) })
  } catch (error) {
    next(error)
  }
}

export async function getComplaint(request, response, next) {
  try {
    const complaint = await Complaint.findById(request.params.id).populate('student', 'name email')
    if (!complaint) throw Object.assign(new Error('Complaint not found'), { statusCode: 404 })
    response.json({ success: true, data: formatComplaint(complaint) })
  } catch (error) {
    next(error)
  }
}

export async function updateComplaint(request, response, next) {
  try {
    const payload = updateSchema.parse(request.body)
    const complaint = await Complaint.findById(request.params.id)
    if (!complaint) throw Object.assign(new Error('Complaint not found'), { statusCode: 404 })
    Object.assign(complaint, payload)
    complaint.timeline.push({ label: payload.status || 'Updated', note: 'Complaint details updated by administrator.' })
    await complaint.save()
    await Notification.create({ user: complaint.student, title: 'Complaint updated', body: `${complaint.title} is now ${complaint.status}.` })
    response.json({ success: true, data: formatComplaint(await complaint.populate('student', 'name email')) })
  } catch (error) {
    next(error)
  }
}
