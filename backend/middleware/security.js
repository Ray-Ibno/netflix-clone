import crypto from 'crypto'
import helmet from 'helmet'

const generateNonce = (req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64')
  next()
}

const cspConfiguration = (req, res, next) => {
  helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'"],
      'object-src': ["'none'"],
      'script-src': [
        (req, res) => `'nonce-${res.locals.nonce}'`,
        "'strict-dynamic'",
        "'unsafe-inline'",
        'https:',
        'http',
      ],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
      'img-src': [
        "'self'",
        'data:',
        'https://image.tmdb.org',
        'https://img.youtube.com',
        'https://*.ytimg.com',
      ],
      'frame-src': ["'self'", 'https://www.youtube.com'],
      'connect-src': [
        "'self'",
        'https://mern-netflix-clone-gofs.onrender.com/', // Allows HTTP polling requests
        'wss://mern-netflix-clone-gofs.onrender.com/', // Allows native WebSocket connections
      ],
      'base-uri': ["'none'"],
    },
  })(req, res, next)
}

export default [generateNonce, cspConfiguration]
