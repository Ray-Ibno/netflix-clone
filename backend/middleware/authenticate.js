import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt

  try {
    if (!token)
      return res.status(401).json({ message: 'You are not authorized' })

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr',
    })

    if (!decoded) {
      return res
        .status(403)
        .json({ message: "You don't have access to this page" })
    }
    const user = await User.findById(decoded.userId)
    if (!user) return res.status(404).json({ message: 'user not found' })
    req.user = user
    next()
  } catch (error) {
    console.error(`Error at authenticate middleware: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default authenticate
