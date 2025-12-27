import fetchTmdb from '../services/tmdb.service.js'

export const getTrendingTvShows = async (req, res) => {
  try {
    const data = await fetchTmdb('https://api.themoviedb.org/3/trending/tv/day')

    if (!data) return res.status(404).json({ content: 'no data found' })

    const shows = data.results
    const randomShows = shows[Math.floor(Math.random() * shows?.length)]

    res.status(200).json({ content: randomShows })
  } catch (error) {
    console.error(`Error at getTrendingTvShows controller: ${error}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getTvTrailers = async (req, res) => {
  const tv_id = req.params.id
  try {
    const data = await fetchTmdb(
      `https://api.themoviedb.org/3/tv/${tv_id}/videos`
    )

    if (!data) return res.status(404).send({ trailers: 'no data found' })

    res.status(200).json({ content: data.results })
  } catch (error) {
    console.error(`Error at getTvTrailers controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getTvDetails = async (req, res) => {
  const tv_id = req.params.id
  try {
    const data = await fetchTmdb(`https://api.themoviedb.org/3/tv/${tv_id}`)
    if (!data) return res.status(404).send({ details: 'no data found' })
    res.status(200).json({ content: data })
  } catch (error) {
    console.error(`Error at getTvDetails controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getSimilarTvShows = async (req, res) => {
  const tv_id = req.params.id

  try {
    const data = await fetchTmdb(
      `https://api.themoviedb.org/3/tv/${tv_id}/similar`
    )
    if (!data) return res.status(404).json({ similarMovies: 'no data found' })
    res.status(200).json({ content: data.results })
  } catch (error) {
    console.error(`Error at getSimilarTvShows controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getTvShowsByCategory = async (req, res) => {
  const { category } = req.params
  //category = now_playing || popular || top_rated || upcomming
  try {
    const data = await fetchTmdb(`https://api.themoviedb.org/3/tv/${category}`)
    if (!data) return res.status(404).json({ content: 'no data found' })
    res.status(200).json({ content: data.results })
  } catch (error) {
    console.error(`Error at getTvShowsByCategory controller: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}
