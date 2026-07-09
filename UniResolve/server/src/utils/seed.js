import { Department } from '../models/department.model.js'

const departments = [
  ['Hostel Administration', 'Hostel'],
  ['Academic Affairs', 'Academics'],
  ['Examination Cell', 'Examination'],
  ['IT Support Desk', 'IT Support'],
  ['Central Library', 'Library'],
  ['Transport Office', 'Transport'],
  ['Campus Maintenance', 'Maintenance'],
  ['Food Services', 'Mess & Cafeteria'],
  ['Campus Security', 'Security'],
  ['Health Centre', 'Medical'],
]

export async function seedDepartments() {
  const count = await Department.countDocuments()
  if (count > 0) return
  await Department.insertMany(
    departments.map(([name, category]) => ({
      name,
      category,
      email: `${category.toLowerCase().replaceAll(' ', '.').replaceAll('&', 'and')}@uniresolve.edu`,
      staff: [{ name: `${category} Officer`, email: `${category.toLowerCase().split(' ')[0]}@uniresolve.edu`, role: 'Coordinator' }],
    })),
  )
}
