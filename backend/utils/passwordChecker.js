const passwordValidator = (password, passwordRepeat) => {
  if (password.length < 8)
    return 'Password needs to be at least 8 characters long'

  if (!/[a-z]/g.test(password))
    return 'Password needs at least one lowercase letter'

  if (!/[A-Z]/g.test(password))
    return 'Password needs at least one uppercase letter'

  if (!/[\d]/g.test(password)) return 'Password needs at least one digit'

  if (password !== passwordRepeat) return 'Passwords do not match'
}

export default passwordValidator
