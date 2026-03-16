import axios from 'axios'

const fetchTmdb = async (url) => {
  const options = {
    method: 'GET',
    url,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  }

  const response = await axios.request(options)
  return response.data
}

export default fetchTmdb
