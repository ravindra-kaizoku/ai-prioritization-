import { Router } from 'express'

import { listNotifications } from '../controllers/notification.controller.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()
router.get('/', authenticate, listNotifications)

export default router
