import * as searchService from '../services/search.service.js'

export const searchMovie = async (req, res) => {
  if (!req.params || !req.params.query) throw new AppError('missing required parameters', 400)
  const movieSearchResult = await searchService.fetchMovie(req.params.query, req.user.id)
  res.status(200).json({ content: movieSearchResult })
}

export const searchPerson = async (req, res) => {
  if (!req.params || !req.params.query) throw new AppError('missing required parameters', 400)
  const personSearchResult = await searchService.fetchPerson(req.params.query, req.user.id)
  res.status(200).json({ content: personSearchResult })
}

export const searchTvShow = async (req, res) => {
  if (!req.params || !req.params.query) throw new AppError('missing required parameters', 400)
  const tvSearchResult = await searchService.fetchTvShow(req.params.query, req.user.id)
  res.status(200).json({ content: tvSearchResult })
}

export const getSearchHistory = async (req, res) => {
  res.status(200).json({ content: req.user.searchHistory })
}

export const removeItemFromSearchHistory = async (req, res) => {
  if (!req.params || !req.params.id) throw new AppError('missing required parameters', 400)
  const updatedSearchHistory = await searchService.deleteHistoryResult(req.params.id, req.user.id)
  res.status(200).json({ content: updatedSearchHistory })
}
