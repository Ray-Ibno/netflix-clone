import User from '../models/user.model.js'
import passwordValidator from '../utils/passwordChecker.js'
import hashPassword from '../utils/hashPassword.js'
import verifyPassword from '../utils/verifyPassword.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const login = async (req, res) => {
  const { username, password } = req.body

  if (!username)
    return res.status(400).json({ message: 'Please provide username' })

  if (!password)
    return res.status(400).json({ message: 'Please provide a password' })

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res
        .status(400)
        .json({ message: 'No user with that username exists' })
    }

    const isPasswordCorrect = await verifyPassword(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' })
    }

    const token = generateTokenAndSetCookie({ userId: user._id }, res)

    res.status(200).json({ token, user })
  } catch (error) {
    console.error(`Error at login controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const signup = async (req, res) => {
  const { email, username, password, passwordRepeat } = req.body
  const emaiRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  try {
    const emaiExists = await User.findOne({ email })
    const usernameExists = await User.findOne({ username })

    if (!email || !username || !password || !passwordRepeat) {
      return res
        .status(400)
        .json({ message: 'Please input all required fields' })
    }

    if (!emaiRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    if (emaiExists) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const invalidPassword = passwordValidator(password, passwordRepeat)

    if (invalidPassword) {
      return res.status(400).json({ message: invalidPassword })
    }

    const hashedPassword = await hashPassword(password)

    const profilePics = ['/avatar1.png', '/avatar2.png', '/avatar3.png']

    const image = profilePics[Math.floor(Math.random() * profilePics.length)]

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      image,
    })

    const token = generateTokenAndSetCookie({ userId: newUser._id }, res)

    res.status(201).json({ token, newUser })
  } catch (error) {
    console.error(`Error at signup controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    })

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error(`Error at logout controller: ${error}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}
