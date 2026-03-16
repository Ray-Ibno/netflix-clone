import express from 'express'
import { getAuthUser, login, logout, signup } from '../controllers/auth.controller.js'

import protectRoute from '../middleware/authenticate.js'
import { validate } from '../middleware/validate.js'
import { loginSchema, signupSchema } from '../validation/auth.validation.js'

const router = express.Router()

router.post('/login', validate(loginSchema), login)

router.post('/signup', validate(signupSchema), signup)

router.post('/logout', logout)

router.get('/authCheck', protectRoute, getAuthUser)

export default router
