export function formatUser(user) {
  return { id: user._id.toString(), name: user.name, email: user.email, role: user.role, department: user.department, studentId: user.studentId, phone: user.phone }
}

export function formatComplaint(complaint) {
  const student = complaint.student || {}
  return {
    id: complaint._id.toString(),
    title: complaint.title,
    description: complaint.description,
    category: complaint.category,
    priority: complaint.priority,
    status: complaint.status,
    department: complaint.department,
    assignedStaff: complaint.assignedStaff,
    imageUrl: complaint.imageUrl,
    studentName: student.name || 'Student',
    createdAt: complaint.createdAt,
    updatedAt: complaint.updatedAt,
    timeline: complaint.timeline.map((item) => ({ label: item.label, note: item.note, at: item.at })),
  }
}
