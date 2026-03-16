import AppError from '../errors/AppError.js'
import User from '../models/user.model.js'
import hashPassword from '../utils/hashPassword.js'
import verifyPassword from '../utils/verifyPassword.js'

export const login = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) throw new AppError('No user with that username exist', 400)

  const isPasswordCorrect = await verifyPassword(password, user.password)
  if (!isPasswordCorrect) throw new AppError('Incorrect password', 400)

  return user
}

export const signup = async (email, username, password) => {
  const emaiExists = await User.findOne({ email })
  const usernameExists = await User.findOne({ username })

  if (emaiExists) throw new AppError('Email already exists', 400)
  if (usernameExists) throw new AppError('Username already exists', 400)

  const hashedPassword = await hashPassword(password)
  const profilePics = ['/avatar1.png', '/avatar2.png', '/avatar3.png']
  const image = profilePics[Math.floor(Math.random() * profilePics.length)]

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    image,
  })

  return user
}
