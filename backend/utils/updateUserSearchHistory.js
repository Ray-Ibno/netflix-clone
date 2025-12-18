import User from '../models/user.model.js'

const updateUserSearchHistory = async (userId, data, type) => {
  await User.findByIdAndUpdate(userId, {
    $push: {
      searchHistory: {
        id: data.results[0].id,
        name: type === 'movie' ? data.results[0].title : data.results[0].name,
        image:
          type === 'person'
            ? data.results[0].profile_path
            : data.results[0].poster_path,
        searchType: type,
        createdAt: new Date(),
      },
    },
  })
}

export default updateUserSearchHistory
