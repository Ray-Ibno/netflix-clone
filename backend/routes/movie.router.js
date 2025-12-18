import express from 'express'
const router = express.Router()

import {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
} from '../controllers/movie.controller.js'

router.get('/trending', getTrendingMovie)
router.get('/trailers/:id', getMovieTrailers)
router.get('/details/:id', getMovieDetails)
router.get('/similar/:id', getSimilarMovies)
router.get('/category/:category', getMoviesByCategory)

export default router
