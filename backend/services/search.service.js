import AppError from '../errors/AppError.js'
import User from '../models/user.model.js'
import updateUserSearchHistory from '../utils/updateUserSearchHistory.js'
import fetchTmdb from './tmdb.service.js'

export const fetchMovie = async (query, userId) => {
  const data = await fetchTmdb(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false`,
  )
  //Some api have data set to null or []
  if (!data) throw new AppError('no data found', 404)
  if (data.results.length === 0) throw new AppError('no data found', 404)

  //Some movies do not have cover images
  const resultsWithImgs = data.results.filter((res) => res.poster_path !== null)

  updateUserSearchHistory(userId, resultsWithImgs, 'movie')
  return resultsWithImgs
}

export const fetchPerson = async (query, userId) => {
  const data = await fetchTmdb(
    `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false`,
  )

  if (!data) throw new AppError('no data found', 404)
  if (data.results.length === 0) throw new AppError('no data found', 404)

  const resultsWithImgs = data.results.filter((res) => res.profile_path !== null)

  updateUserSearchHistory(userId, resultsWithImgs, 'person')
  return resultsWithImgs
}

export const fetchTvShow = async (query, userId) => {
  const data = await fetchTmdb(
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false`,
  )

  if (!data) throw new AppError('no data found', 404)
  if (data.results.length === 0) throw new AppError('no data found', 404)

  const resultsWithImgs = data.results.filter((res) => res.poster_path !== null)

  updateUserSearchHistory(userId, resultsWithImgs, 'tv')
  return resultsWithImgs
}

export const deleteHistoryResult = async (searchHistoryId, userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { searchHistory: { id: Number(searchHistoryId) } } },
    { new: true },
  )
  if (!user) throw new AppError('no data found', 404)
  return user
}
