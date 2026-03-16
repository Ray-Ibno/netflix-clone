import AppError from '../errors/AppError.js'
import fetchTmdb from './tmdb.service.js'

export const fetchTrendingMovies = async () => {
  const data = await fetchTmdb('https://api.themoviedb.org/3/trending/movie/day')

  if (!data || data.results.length === 0) throw new AppError('no data found', 404)

  const movies = data.results
  const randomMovie = movies[Math.floor(Math.random() * movies?.length)]
  return randomMovie
}

export const fetchMovieTrailers = async (movieId) => {
  const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${movieId}/videos`)

  if (!data || data.results.length === 0) throw new AppError('no data found', 404)
  return data.results
}

export const fetchMovieDetails = async (movieId) => {
  const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${movieId}`)
  if (!data) throw new AppError('no data found', 404)
  return data
}

export const fetchSimilarMovies = async (movieId) => {
  const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${movieId}/similar`)
  if (!data || data.results.length === 0) throw new AppError('no data found', 404)
  return data.results
}

export const fetchMoviesByCategory = async (category) => {
  //category = now_playing || popular || top_rated || upcomming

  const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${category}`)
  if (!data || data.results.length === 0) throw new AppError('no data found', 404)
  return data.results
}
