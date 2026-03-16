import * as movieService from '../services/movie.service.js'

export const getTrendingMovie = async (req, res) => {
  const randomMovie = await movieService.fetchTrendingMovies()
  res.status(200).json({ content: randomMovie })
}

export const getMovieTrailers = async (req, res) => {
  const movieTrailers = await movieService.fetchMovieTrailers(req.params.id)
  res.status(200).json({ content: movieTrailers })
}

export const getMovieDetails = async (req, res) => {
  const movieDetails = await movieService.fetchMovieDetails(req.params.id)
  res.status(200).json({ content: movieDetails })
}

export const getSimilarMovies = async (req, res) => {
  const similarMovies = await movieService.fetchSimilarMovies(req.params.id)
  res.status(200).json({ content: similarMovies })
}

export const getMoviesByCategory = async (req, res) => {
  const moviesByCategory = await movieService.fetchMoviesByCategory(req.params.category)
  res.status(200).json({ content: moviesByCategory })
}
