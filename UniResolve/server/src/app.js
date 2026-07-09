import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import { errorHandler } from './middleware/error-handler.js'
import analyticsRoutes from './routes/analytics.routes.js'
import authRoutes from './routes/auth.routes.js'
import complaintRoutes from './routes/complaint.routes.js'
import departmentRoutes from './routes/department.routes.js'
import feedbackRoutes from './routes/feedback.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import userRoutes from './routes/user.routes.js'

export function createApp() {
  const app = express()
  app.use(helmet())
  app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
  app.use(express.json({ limit: '2mb' }))
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }))
  app.get('/health', (_request, response) => response.json({ status: 'ok', service: 'uniresolve-api' }))
  app.use('/api/auth', authRoutes)
  app.use('/api/complaints', complaintRoutes)
  app.use('/api/departments', departmentRoutes)
  app.use('/api/notifications', notificationRoutes)
  app.use('/api/feedback', feedbackRoutes)
  app.use('/api/analytics', analyticsRoutes)
  app.use('/api/users', userRoutes)
  app.use(errorHandler)
  return app
}
