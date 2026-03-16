import { globalErrorHandler } from './middleware/globalErrorHandler.js'

import cookieParser from 'cookie-parser'

import express from 'express'
import path from 'path'

import authRouter from './routes/auth.route.js'
import movieRouter from './routes/movie.route.js'
import tvRouter from './routes/tv.route.js'
import searchRouter from './routes/search.route.js'
import testRouter from './routes/test.route.js'

import protectRoute from './middleware/authenticate.js'

const app = express()

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/movie', protectRoute, movieRouter)
app.use('/api/v1/tv', protectRoute, tvRouter)
app.use('/api/v1/search', protectRoute, searchRouter)
app.use('/test', testRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('/*path', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.use(globalErrorHandler)

export default app
