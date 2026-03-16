import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import AppError from '../errors/AppError.js'

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) throw new AppError('You are not authorized', 401)

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr',
  })

  if (!decoded) throw new AppError("You don't have access to this page", 403)

  const user = await User.findById(decoded.userId)
  if (!user) throw new AppError('user not found', 404)
  req.user = user
  next()
}

export default authenticate
