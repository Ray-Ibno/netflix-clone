import express from 'express'
import {
  getAuthUser,
  login,
  logout,
  signup,
} from '../controllers/auth.controller.js'

import protectRoute from '../middleware/authenticate.js'

const router = express.Router()

router.post('/login', login)

router.post('/signup', signup)

router.post('/logout', logout)

router.get('/authCheck', protectRoute, getAuthUser)

export default router
