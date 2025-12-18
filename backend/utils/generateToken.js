import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET)

  res.cookie('jwt', token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  })

  return token
}

export default generateTokenAndSetCookie
