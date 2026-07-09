import { Router } from 'express'

import { listDepartments } from '../controllers/department.controller.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()
router.get('/', authenticate, listDepartments)

export default router
