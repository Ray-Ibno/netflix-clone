import * as authService from '../services/auth.service.js'
import * as tokenService from '../services/token.service.js'
import { handleRefresh } from '../services/token.service.js'

export const login = async (req, res) => {
  const user = await authService.login(req.body.username, req.body.password)
  const accessToken = await tokenService.generateAccessToken(user._id)
  await tokenService.generateRefreshToken(user._id, res)
  res.status(200).json({ accessToken, user })
}

export const signup = async (req, res) => {
  const user = await authService.signup(req.body.email, req.body.username, req.body.password)
  const accessToken = await tokenService.generateAccessToken(user._id)
  await tokenService.generateRefreshToken(user._id, res)
  res.status(201).json({ accessToken, user })
}

export const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  })

  res.status(200).json({ message: 'Logged out successfully' })
}

export const refresh = async (req, res) => {
  const newAccessToken = await handleRefresh(req.cookies, res)
  res.status(200).json({ accessToken: newAccessToken })
}

export const getAuthUser = (req, res) => {
  const authUser = req.user
  res.status(200).json(authUser)
}
