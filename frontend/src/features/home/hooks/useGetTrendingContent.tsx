import { useContentStore } from '../../../store/content'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Content } from '../types'
import { api } from '../../../lib/api'

const useGetTrendingContent = () => {
  const { contentType } = useContentStore()

  const getTrendingContent = async () => {
    try {
      const response = await api.get(`/${contentType}/trending`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message)
      }
    }
  }

  return useQuery<Content>({
    queryKey: ['trendingContent', contentType],
    queryFn: getTrendingContent,
    refetchOnWindowFocus: false,
    retry: false,
  })
}
export default useGetTrendingContent
