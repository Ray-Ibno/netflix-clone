import axios from 'axios'
import { useState } from 'react'

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
    let category = ''
    if (activeTab === 'Movie') category = 'movie'
    if (activeTab === 'TV Show') category = 'tv'
    if (activeTab === 'People') category = 'person'
    try {
      setIsLoading(true)
      const response = await axios.get(`/api/v1/search/${category}/${query}`)
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

  const clearResutls = () => setData([])

  return { getSearchContentResults, clearResutls, data, isLoading, error }
}
export default useGetSearchResults
