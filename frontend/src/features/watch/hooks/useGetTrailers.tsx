import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContentStore } from '../../../store/content'

import type { Trailers } from '../types'
import { api } from '../../../lib/api'

const useGetTrailers = (id?: string) => {
  const { contentType } = useContentStore()

  const getTrailers = async () => {
    try {
      const response = await api.get(`/${contentType}/trailers/${id}`)
      return response.data.content
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message)
      }
      return null
    }
  }

  return useQuery<Trailers>({
    queryKey: ['trailers', contentType, id],
    queryFn: getTrailers,
    refetchOnWindowFocus: false,
  })
}

export default useGetTrailers
