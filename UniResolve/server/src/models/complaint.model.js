import mongoose from 'mongoose'

const timelineSchema = new mongoose.Schema({ label: String, note: String, at: { type: Date, default: Date.now } }, { _id: false })

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: ['Hostel', 'Academics', 'Examination', 'IT Support', 'Library', 'Transport', 'Maintenance', 'Mess & Cafeteria', 'Security', 'Medical'], required: true },
    priority: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], required: true },
    status: { type: String, enum: ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed'], default: 'Submitted' },
    department: { type: String, required: true },
    assignedStaff: { type: String },
    imageUrl: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    aiConfidence: { type: Number, default: 0 },
    timeline: [timelineSchema],
  },
  { timestamps: true },
)

export const Complaint = mongoose.model('Complaint', complaintSchema)
