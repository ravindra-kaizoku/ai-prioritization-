import { Router } from 'express'

import { listUsers } from '../controllers/user.controller.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = Router()
router.get('/', authenticate, authorize('admin'), listUsers)

export default router
