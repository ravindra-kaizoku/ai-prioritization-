import { Complaint } from '../models/complaint.model.js'

export async function getSummary(_request, response, next) {
  try {
    const complaints = await Complaint.find()
    const count = (field, value) => complaints.filter((item) => item[field] === value).length
    const group = (field) => Object.entries(complaints.reduce((acc, item) => ({ ...acc, [item[field]]: (acc[item[field]] || 0) + 1 }), {})).map(([name, value]) => ({ name, value }))
    response.json({ success: true, data: { total: complaints.length, open: complaints.filter((item) => !['Resolved', 'Closed'].includes(item.status)).length, resolved: count('status', 'Resolved') + count('status', 'Closed'), critical: count('priority', 'Critical'), byCategory: group('category'), byPriority: group('priority'), trend: buildTrend(complaints) } })
  } catch (error) {
    next(error)
  }
}

function buildTrend(complaints) {
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  return months.map((month) => ({ month, complaints: complaints.filter((item) => item.createdAt.toLocaleString('en', { month: 'short' }) === month).length, resolved: complaints.filter((item) => ['Resolved', 'Closed'].includes(item.status) && item.updatedAt.toLocaleString('en', { month: 'short' }) === month).length }))
}
