import jwt from 'jsonwebtoken'
import redis from '../config/redis.js'
import AppError from '../errors/AppError.js'

export const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  })
  return accessToken
}

export const generateRefreshToken = async (userId, res) => {
  const key = `netflix-session:${userId}`

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXP,
  })

  await redis.set(key, refreshToken)

  res.cookie('jwt', refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  })
}

export const handleRefresh = async (cookies, res) => {
  if (!cookies) throw new AppError('No jwt cookies found', 400)

  const refreshToken = cookies.jwt
  if (!refreshToken) throw new AppError('No token found', 400)

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

  const storedToken = await redis.get(`netflix-session:${decoded.userId}`)
  if (refreshToken !== storedToken) throw new AppError('Expired token', 403)

  const newAccessToken = generateAccessToken(decoded.userId)
  await generateRefreshToken(decoded.userId, res)
  return newAccessToken
}
