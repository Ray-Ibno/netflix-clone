import 'dotenv/config'
import { dbConnect } from './config/dbConnect.js'
import app from './app.js'
import { setupGracefulShutdown } from './utils/shutdown.js'

const PORT = process.env.PORT || 5300

const startServer = async () => {
  await dbConnect()

  const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })

  setupGracefulShutdown(server)
}

startServer()
