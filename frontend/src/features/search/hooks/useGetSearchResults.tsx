import axios from 'axios'
import { useState } from 'react'
import { api } from '../../../lib/api'

type ActiveTabProp = 'Movie' | 'TV Show' | 'People'

type Data = {
  id: string
  name?: string
  poster_path?: string
  profile_path?: string
}[]

const useGetSearchResults = (activeTab: ActiveTabProp, query: string) => {
  const [data, setData] = useState<Data>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<number | null>()

  const getSearchContentResults = async () => {
    if (!query || query.trim() === '') {
      setData([]) // Optionally reset data array
      setError(null)
      return
    }

    let category = ''
    if (activeTab === 'Movie') category = 'movie'
    if (activeTab === 'TV Show') category = 'tv'
    if (activeTab === 'People') category = 'person'
    try {
      setIsLoading(true)
      const response = await api.get(`/search/${category}/${query}`)
      setData(response.data.content)
      setIsLoading(false)
      setError(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.status)
      }
      setIsLoading(false)
    }
  }

  const clearResults = () => setData([])

  return { getSearchContentResults, clearResults, data, isLoading, error }
}
export default useGetSearchResults
