import axios from 'axios'
import { useContentStore } from '../../../store/content'
import { useQuery } from '@tanstack/react-query'
import type { Content, ContentCategory } from '../types'
import { api } from '../../../lib/api'

const useGetByCategoryContent = (category: ContentCategory) => {
  const { contentType } = useContentStore()

  const getByCategoryContent = async () => {
    try {
      const response = await api.get(`/${contentType}/category/${category}`)
      return response.data.content
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message)
      }
    }
  }

  return useQuery<Content['content'][]>({
    queryKey: ['byCategoryContent', contentType, category],
    queryFn: getByCategoryContent,
    refetchOnWindowFocus: false,
    retry: false,
    select: (data) => data,
  })
}
export default useGetByCategoryContent
