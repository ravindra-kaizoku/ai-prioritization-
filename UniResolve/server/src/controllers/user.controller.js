import { User } from '../models/user.model.js'
import { formatUser } from '../utils/format.js'

export async function listUsers(_request, response, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    response.json({ success: true, data: users.map(formatUser) })
  } catch (error) {
    next(error)
  }
}
