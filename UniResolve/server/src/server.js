import dotenv from 'dotenv'

import { createApp } from './app.js'
import { connectDatabase } from './config/database.js'
import { seedDepartments } from './utils/seed.js'

dotenv.config()

const port = process.env.PORT || 5000
const app = createApp()

connectDatabase()
  .then(seedDepartments)
  .then(() => {
    app.listen(port, () => console.log(`UniResolve API running on http://localhost:${port}`))
  })
  .catch((error) => {
    if (process.env.NODE_ENV === 'production') {
      console.error('Failed to start server', error)
      process.exit(1)
    }
    console.warn('MongoDB is unavailable; starting API in development mode with database routes disabled until MongoDB is running.')
    console.warn(error.message)
    app.listen(port, () => console.log(`UniResolve API running on http://localhost:${port}`))
  })
