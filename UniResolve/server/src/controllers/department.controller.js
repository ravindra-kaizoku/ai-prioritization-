import { Department } from '../models/department.model.js'

export async function listDepartments(_request, response, next) {
  try {
    response.json({ success: true, data: await Department.find().sort({ name: 1 }) })
  } catch (error) {
    next(error)
  }
}
