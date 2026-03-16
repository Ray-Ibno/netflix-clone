import express from 'express'

const router = express.Router()

router.get('/shutdown', (req, res) => {
  console.log('Slow request started...')

  // Simulate a 5-second heavy task (like a big DB query) to test graceful shutdown
  //localhost:5200/test/shutdown
  setTimeout(() => {
    console.log('Slow request finished!')
    res.send('Request completed successfully!')
  }, 5000)
})

export default router
