import { Router } from 'express'

import { createFeedback } from '../controllers/feedback.controller.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()
router.post('/', authenticate, createFeedback)

export default router
