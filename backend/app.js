import { globalErrorHandler } from './middleware/globalErrorHandler.js'

import cookieParser from 'cookie-parser'

import express from 'express'
import path from 'path'
import fs from 'fs'
import cors from 'cors'

import authRouter from './routes/auth.route.js'
import movieRouter from './routes/movie.route.js'
import tvRouter from './routes/tv.route.js'
import searchRouter from './routes/search.route.js'
import testRouter from './routes/test.route.js'

import protectRoute from './middleware/authenticate.js'
import security from './middleware/security.js'

const app = express()

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
    credentials: true,
  }),
)
app.use(security)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/movie', protectRoute, movieRouter)
app.use('/api/v1/tv', protectRoute, tvRouter)
app.use('/api/v1/search', protectRoute, searchRouter)
app.use('/test', testRouter)

if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, 'frontend', 'dist')

  app.use(express.static(distPath, { index: false }))

  app.get('/{*splat}', (req, res) => {
    const indexPath = path.resolve(distPath, 'index.html')

    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error('Path Error: Cannot find your frontend file at:', indexPath)
        return res.status(500).send('Error loading frontend bundle.')
      }

      const securedHtml = htmlData.replace(/__CSP_NONCE__/g, res.locals.nonce)
      res.send(securedHtml)
    })
  })
}

app.use(globalErrorHandler)

export default app
