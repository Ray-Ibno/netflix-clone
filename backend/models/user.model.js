import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    searchHistory: {
      type: Array,
      default: [],
    },
  },
  {
    //deletes password and version key from response
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.__v
      },
    },
  }
)

const User = mongoose.model('User', userSchema)

export default User
