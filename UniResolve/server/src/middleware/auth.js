import jwt from 'jsonwebtoken'

import { User } from '../models/user.model.js'

export async function authenticate(request, _response, next) {
  try {
    const header = request.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''
    if (!token) throw Object.assign(new Error('Authentication token required'), { statusCode: 401 })
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    const user = await User.findById(decoded.id).select('-password')
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 401 })
    request.user = user
    next()
  } catch (error) {
    next(Object.assign(error, { statusCode: error.statusCode || 401 }))
  }
}

export function authorize(...roles) {
  return (request, _response, next) => {
    if (!roles.includes(request.user.role)) next(Object.assign(new Error('Access denied'), { statusCode: 403 }))
    else next()
  }
}
