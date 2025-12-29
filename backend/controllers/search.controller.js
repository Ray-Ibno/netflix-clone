import User from '../models/user.model.js'
import fetchTmdb from '../services/tmdb.service.js'
import updateUserSearchHistory from '../utils/updateUserSearchHistory.js'

export const searchMovie = async (req, res) => {
  const { query } = req.params
  try {
    const data = await fetchTmdb(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    )
    if (!data) return res.status(404).json(null)
    if (data.results.length === 0) return res.status(404).json(null)

    const resultsWithImgs = data.results.filter((res) => res.poster_path !== null)

    updateUserSearchHistory(req.user._id, resultsWithImgs, 'movie')

    res.status(200).json({ content: resultsWithImgs })
  } catch (error) {
    console.error(`Error at searchMovie controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const searchPerson = async (req, res) => {
  const { query } = req.params

  try {
    const data = await fetchTmdb(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    )
    if (!data) return res.status(404).json(null)
    if (data.results.length === 0) return res.status(404).json(null)

    const resultsWithImgs = data.results.filter((res) => res.profile_path !== null)

    updateUserSearchHistory(req.user._id, resultsWithImgs, 'person')

    res.status(200).json({ content: resultsWithImgs })
  } catch (error) {
    console.error(`Error at searchPerson controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const searchTvShow = async (req, res) => {
  const { query } = req.params

  try {
    const data = await fetchTmdb(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    )
    if (!data) return res.status(404).json(null)
    if (data.results.length === 0) return res.status(404).json(null)

    const resultsWithImgs = data.results.filter((res) => res.poster_path !== null)

    updateUserSearchHistory(req.user._id, resultsWithImgs, 'tv')

    res.status(200).json({ content: resultsWithImgs })
  } catch (error) {
    console.error(`Error at searchTvShow controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ content: req.user.searchHistory })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const removeItemFromSearchHistory = async (req, res) => {
  const searchHistoryId = req.params.id
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { searchHistory: { id: Number(searchHistoryId) } } },
      { new: true }
    )
    if (!user) return res.status(404).json({ message: 'no user found' })
    res.status(200).json(user)
  } catch (error) {
    console.error(`Error at removeItemFromSearchHistory controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}
