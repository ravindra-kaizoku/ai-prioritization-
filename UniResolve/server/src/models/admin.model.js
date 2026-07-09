import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
  },
  { timestamps: true },
)

export const Admin = mongoose.model('Admin', adminSchema)
