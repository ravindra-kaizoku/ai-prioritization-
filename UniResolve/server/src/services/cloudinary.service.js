import { Readable } from 'node:stream'

import { cloudinary } from '../config/cloudinary.js'

export async function uploadImage(file) {
  if (!file || !process.env.CLOUDINARY_CLOUD_NAME) return undefined
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'uniresolve/complaints' }, (error, result) => {
      if (error) reject(error)
      else resolve(result.secure_url)
    })
    Readable.from(file.buffer).pipe(stream)
  })
}
