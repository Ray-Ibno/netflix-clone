import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../../lib/api'

const useDeleteHistory = () => {
  const queryClient = useQueryClient()

  const deleteHistory = async (id: string) => {
    try {
      const response = await api.delete(`/search/history/${id}`)
      return response.status
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
      }
    }
  }

  return useMutation({
    mutationFn: deleteHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] })
      toast.success('Successfully deleted a history')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export default useDeleteHistory
