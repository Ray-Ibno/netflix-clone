import fetchTmdb from '../services/tmdb.service.js'

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchTmdb('https://api.themoviedb.org/3/trending/movie/day')

    if (!data || data.results.length === 0)
      return res.status(404).json({ content: 'no data found' })

    const movies = data.results
    const randomMovie = movies[Math.floor(Math.random() * movies?.length)]

    res.status(200).json({ content: randomMovie })
  } catch (error) {
    console.error(`Error at getTrendingMovies controller: ${error}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getMovieTrailers = async (req, res) => {
  const movie_id = req.params.id
  try {
    const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${movie_id}/videos`)

    if (!data || data.results.length === 0)
      return res.status(404).send({ trailers: 'no data found' })

    res.status(200).json({ content: data.results })
  } catch (error) {
    console.error(`Error at getMovieTrailers controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getMovieDetails = async (req, res) => {
  const movie_id = req.params.id
  try {
    const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${movie_id}`)
    if (!data) return res.status(404).send({ details: 'no data found' })
    res.status(200).json({ content: data })
  } catch (error) {
    console.error(`Error at getMovieDetails controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getSimilarMovies = async (req, res) => {
  const movie_id = req.params.id

  try {
    const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${movie_id}/similar`)
    if (!data || data.results.length === 0)
      return res.status(404).json({ similarMovies: 'no data found' })
    res.status(200).json({ content: data.results })
  } catch (error) {
    console.error(`Error at getSimilarMovies controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params
  //category = now_playing || popular || top_rated || upcomming
  try {
    const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${category}`)
    if (!data || data.results.length === 0)
      return res.status(404).json({ content: 'no data found' })
    res.status(200).json({ content: data.results })
  } catch (error) {
    console.error(`Error at getMovieByCategory controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}
