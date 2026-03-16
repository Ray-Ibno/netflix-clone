import express from 'express'
import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPerson,
  searchTvShow,
} from '../controllers/search.controller.js'
const router = express.Router()

router.get('/movie/:query', searchMovie)
router.get('/person/:query', searchPerson)
router.get('/tv/:query', searchTvShow)

router.get('/history', getSearchHistory)

router.delete('/history/:id', removeItemFromSearchHistory)

export default router
