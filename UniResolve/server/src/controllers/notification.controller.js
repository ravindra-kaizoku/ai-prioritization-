import { Notification } from '../models/notification.model.js'

export async function listNotifications(request, response, next) {
  try {
    const notifications = await Notification.find({ user: request.user._id }).sort({ createdAt: -1 })
    response.json({ success: true, data: notifications.map((item) => ({ id: item._id.toString(), title: item.title, body: item.body, read: item.read, createdAt: item.createdAt })) })
  } catch (error) {
    next(error)
  }
}
