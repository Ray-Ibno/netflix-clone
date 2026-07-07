import axios from 'axios'
import { useContentStore } from '../../../store/content'
import { useQuery } from '@tanstack/react-query'

import type { Similar } from '../types'
import { api } from '../../../lib/api'

const useGetSimilar = (id?: string) => {
  const { contentType } = useContentStore()

  const getSimilar = async () => {
    try {
      const response = await api.get(`/${contentType}/similar/${id}`)
      return response.data.content
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message)
      }
      return null
    }
  }

  return useQuery<Similar>({
    queryKey: ['similar', contentType, id],
    queryFn: getSimilar,
    refetchOnWindowFocus: false,
  })
}
export default useGetSimilar
