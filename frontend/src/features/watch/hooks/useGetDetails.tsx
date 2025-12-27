import axios from 'axios'
import { useContentStore } from '../../../store/content'
import { useQuery } from '@tanstack/react-query'

import type { ContentDetails } from '../types'

const useGetDetails = (id?: string) => {
  const { contentType } = useContentStore()

  const getDetails = async () => {
    try {
      const response = await axios.get(`/api/v1/${contentType}/details/${id}`)
      return response.data.content
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message)
      }
      return null
    }
  }

  return useQuery<ContentDetails>({
    queryKey: ['details', contentType],
    queryFn: getDetails,
    refetchOnWindowFocus: false,
  })
}
export default useGetDetails
