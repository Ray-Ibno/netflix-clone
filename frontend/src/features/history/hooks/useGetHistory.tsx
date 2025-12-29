import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { History } from '../types'

const useGetHistory = () => {
  const getHistory = async () => {
    try {
      const response = await axios.get(`/api/v1/search/history`)
      return response.data.content
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
      }
    }
  }

  return useQuery<History>({
    queryKey: ['history'],
    queryFn: getHistory,
    refetchOnWindowFocus: false,
  })
}
export default useGetHistory
