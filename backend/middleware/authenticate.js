import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import AppError from '../errors/AppError.js'

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']
  if (!authHeader?.startsWith('Bearer ')) throw new AppError('No token found', 401)

  const accessToken = authHeader.split(' ')[1]

  let decoded
  try {
    decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Your token has expired', 401)
    }

    throw new AppError('Invalid Token', 401)
  }

  const user = await User.findById(decoded.userId)
  if (!user) throw new AppError('user not found', 404)
  req.user = user
  next()
}

export default authenticate
