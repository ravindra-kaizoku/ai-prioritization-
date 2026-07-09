import { Router } from 'express'

import { createComplaint, getComplaint, listComplaints, updateComplaint } from '../controllers/complaint.controller.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = Router()
router.use(authenticate)
router.get('/', listComplaints)
router.post('/', authorize('student'), upload.single('image'), createComplaint)
router.get('/:id', getComplaint)
router.patch('/:id', authorize('admin'), updateComplaint)

export default router
