import bcrypt from 'bcryptjs'

const verifyPassword = async (password, hashedPassword) => {
  try {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword)
    return isPasswordMatched ? true : false
  } catch (error) {
    console.error('Error at verifying password')
    throw error
  }
}

export default verifyPassword
