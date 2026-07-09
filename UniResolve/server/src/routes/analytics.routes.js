import { Router } from 'express'

import { getSummary } from '../controllers/analytics.controller.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = Router()
router.get('/summary', authenticate, authorize('admin'), getSummary)

export default router
