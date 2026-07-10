import { z } from 'zod'

import { User } from '../models/user.model.js'
import { formatUser } from '../utils/format.js'
import { signToken } from '../utils/token.js'

const registerSchema = z.object({ name: z.string().min(2), email: z.email(), password: z.string().min(6), role: z.enum(['student', 'admin', 'staff']), studentId: z.string().optional() })
const loginSchema = z.object({ email: z.email(), password: z.string().min(6), role: z.enum(['student', 'admin', 'staff']).optional() })

export async function register(request, response, next) {
  try {
    const payload = registerSchema.parse(request.body)
    const existing = await User.findOne({ email: payload.email })
    if (existing) throw Object.assign(new Error('Email already registered'), { statusCode: 409 })
    const user = await User.create(payload)
    response.status(201).json({ success: true, data: { token: signToken(user), user: formatUser(user) } })
  } catch (error) {
    next(error)
  }
}

export async function login(request, response, next) {
  try {
    const payload = loginSchema.parse(request.body)
    const user = await User.findOne({ email: payload.email }).select('+password')
    if (!user || !(await user.comparePassword(payload.password))) throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 })
    if (payload.role && payload.role !== user.role) throw Object.assign(new Error('Invalid role for account'), { statusCode: 403 })
    response.json({ success: true, data: { token: signToken(user), user: formatUser(user) } })
  } catch (error) {
    next(error)
  }
}
