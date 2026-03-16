import generateTokenAndSetCookie from '../utils/generateToken.js'
import * as authService from '../services/auth.service.js'

export const login = async (req, res) => {
  const user = await authService.login(req.body.username, req.body.password)
  const token = generateTokenAndSetCookie({ userId: user._id }, res)
  res.status(200).json({ token, user })
}

export const signup = async (req, res) => {
  const user = await authService.signup(req.body.email, req.body.username, req.body.password)
  const token = generateTokenAndSetCookie({ userId: user._id }, res)
  res.status(201).json({ token, user })
}

export const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  })

  res.status(200).json({ message: 'Logged out successfully' })
}

export const getAuthUser = (req, res) => {
  const authUser = req.user
  res.status(200).json(authUser)
}
