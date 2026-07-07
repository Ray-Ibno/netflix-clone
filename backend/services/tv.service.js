import AppError from '../errors/AppError.js'
import { getOrSetCache } from '../utils/cacheManager.js'
import fetchTmdb from './tmdb.service.js'

export const fetchTrendingTvShows = async () => {
  const data = await getOrSetCache(
    'tv_trending',
    async () => await fetchTmdb('https://api.themoviedb.org/3/trending/tv/day'),
  )

  if (!data) throw new AppError('no data found', 404)

  const shows = data.results
  const randomShows = shows[Math.floor(Math.random() * shows?.length)]
  return randomShows
}

export const fetchTvTrailers = async (tvId) => {
  const data = await getOrSetCache(
    `tv_trailers_${tvId}`,
    async () => await fetchTmdb(`https://api.themoviedb.org/3/tv/${tvId}/videos`),
  )
  if (!data || data.results.length === 0) throw new AppError('no data found', 404)
  return data.results
}

export const fetchTvDetails = async (tvId) => {
  const data = await getOrSetCache(
    `tv_details_${tvId}`,
    async () => await fetchTmdb(`https://api.themoviedb.org/3/tv/${tvId}`),
  )
  if (!data) throw new AppError('no data found', 404)
  return data
}

export const fetchSimilarTvShows = async (tvId) => {
  const data = await getOrSetCache(
    `tv_similar_${tvId}`,
    async () => await fetchTmdb(`https://api.themoviedb.org/3/tv/${tvId}/similar`),
  )
  if (!data) throw new AppError('no data found', 404)
  return data.results
}

export const fetchShowsByCategory = async (category) => {
  //category = now_playing || popular || top_rated || upcomming

  const data = await getOrSetCache(
    `tv_byCategory_${category}`,
    async () => await fetchTmdb(`https://api.themoviedb.org/3/tv/${category}`),
  )
  if (!data) throw new AppError('no data found', 404)
  return data.results
}
