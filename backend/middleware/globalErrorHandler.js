export const globalErrorHandler = (err, req, res, next) => {
  console.error('Error 🤯: ', err.stack)

  const statusCode = err.statusCode || 500

  const message = err.message || 'Internal server error'

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  })

  next()
}
