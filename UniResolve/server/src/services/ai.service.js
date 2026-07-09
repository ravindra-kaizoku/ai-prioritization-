import axios from 'axios'

const categoryDepartments = {
  Hostel: 'Hostel Administration',
  Academics: 'Academic Affairs',
  Examination: 'Examination Cell',
  'IT Support': 'IT Support Desk',
  Library: 'Central Library',
  Transport: 'Transport Office',
  Maintenance: 'Campus Maintenance',
  'Mess & Cafeteria': 'Food Services',
  Security: 'Campus Security',
  Medical: 'Health Centre',
}

export async function classifyComplaint(title, description) {
  try {
    const response = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/predict`, { title, description }, { timeout: 4000 })
    return response.data
  } catch {
    return heuristicClassify(`${title} ${description}`)
  }
}

function heuristicClassify(text) {
  const lower = text.toLowerCase()
  const rules = [
    ['Hostel', ['hostel', 'room', 'warden', 'washroom']],
    ['Examination', ['exam', 'admit card', 'result', 'marksheet']],
    ['IT Support', ['portal', 'login', 'wifi', 'internet', 'password']],
    ['Library', ['library', 'book', 'renewal']],
    ['Transport', ['bus', 'transport', 'route']],
    ['Maintenance', ['leak', 'electric', 'repair', 'broken']],
    ['Mess & Cafeteria', ['mess', 'food', 'cafeteria']],
    ['Security', ['security', 'theft', 'unsafe']],
    ['Medical', ['medical', 'health', 'clinic', 'injury']],
  ]
  const match = rules.find(([, terms]) => terms.some((term) => lower.includes(term)))
  const category = match?.[0] || 'Academics'
  const priority = lower.includes('urgent') || lower.includes('unsafe') || lower.includes('electric') ? 'Critical' : lower.includes('exam') ? 'High' : 'Medium'
  return { category, priority, department: categoryDepartments[category], confidence: 0.72 }
}
