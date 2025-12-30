import 'dotenv/config'
import express from 'express'
import path from 'path'
import { dbConnect } from './config/dbConnect.js'
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.router.js'
import movieRouter from './routes/movie.router.js'
import tvRouter from './routes/tv.router.js'
import searchRoute from './routes/search.router.js'

import protectRoute from './middleware/authenticate.js'

const app = express()

const __dirname = path.resolve()

const PORT = process.env.PORT || 5300

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/movie', protectRoute, movieRouter)
app.use('/api/v1/tv', protectRoute, tvRouter)
app.use('/api/v1/search', protectRoute, searchRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  dbConnect()
})
