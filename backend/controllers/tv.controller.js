import * as tvService from '../services/tv.service.js'

export const getTrendingTvShows = async (req, res) => {
  const randomShows = await tvService.fetchTrendingTvShows()
  res.status(200).json({ content: randomShows })
}

export const getTvTrailers = async (req, res) => {
  const tvTrailers = await tvService.fetchTvTrailers(req.params.id)
  res.status(200).json({ content: tvTrailers })
}

export const getTvDetails = async (req, res) => {
  const tvDetails = await tvService.fetchTvDetails(req.params.id)
  res.status(200).json({ content: tvDetails })
}

export const getSimilarTvShows = async (req, res) => {
  const similarTvShows = await tvService.fetchSimilarTvShows(req.params.id)
  res.status(200).json({ content: similarTvShows })
}

export const getTvShowsByCategory = async (req, res) => {
  const tvShowsByCategory = await tvService.fetchShowsByCategory(req.params.category)
  res.status(200).json({ content: tvShowsByCategory })
}
