import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    email: { type: String, required: true },
    staff: [{ name: String, email: String, role: String }],
    slaHours: { type: Number, default: 48 },
  },
  { timestamps: true },
)

export const Department = mongoose.model('Department', departmentSchema)
