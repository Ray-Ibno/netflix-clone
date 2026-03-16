import mongoose from 'mongoose'

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`connected to the db ${conn.connection.host}`)
  } catch (error) {
    console.error(`connection to db error: ${error.message}`)
    process.exit(1)
  }
}

mongoose.connection.on('error', (err) => {
  console.error(`Runtime database error: ${err}`)
})
