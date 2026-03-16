import bcrypt from 'bcryptjs'

const verifyPassword = async (password, hashedPassword) => {
  const isPasswordMatched = await bcrypt.compare(password, hashedPassword)
  return isPasswordMatched ? true : false
}

export default verifyPassword
