import User from '../models/user.model.js'

const updateUserSearchHistory = async (userId, data, type) => {
  const exists = await User.findOne({
    _id: userId,
    'searchHistory.id': data[0].id,
  })

  if (exists) return

  await User.findByIdAndUpdate(userId, {
    $push: {
      searchHistory: {
        id: data[0].id,
        name: type === 'movie' ? data[0].title : data[0].name,
        image: type === 'person' ? data[0].profile_path : data[0].poster_path,
        searchType: type,
        createdAt: new Date(),
      },
    },
  })
}

export default updateUserSearchHistory
