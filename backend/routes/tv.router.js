import {
  getSimilarTvShows,
  getTrendingTvShows,
  getTvDetails,
  getTvShowsByCategory,
  getTvTrailers,
} from '../controllers/tv.controller.js'
import router from './movie.router.js'

router.get('/trending', getTrendingTvShows)
router.get('/trailers/:id', getTvTrailers)
router.get('/details/:id', getTvDetails)
router.get('/similar/:id', getSimilarTvShows)
router.get('/category/:category', getTvShowsByCategory)

export default router
