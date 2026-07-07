import axios from 'axios'
import { useAuthStore } from '../store/authUser'

export const api = axios.create({
  baseURL: '/api/v1',
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Check if error is a 401 and we haven't tried retrying this specific request yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Mark request so we don't loop infinitely

      try {
        const newToken = await useAuthStore.getState().refreshAccessToken()
        console.log('new token', newToken)

        if (newToken) {
          originalRequest.headers.set('Authorization', `Bearer ${newToken}`)

          return api(originalRequest)
        }
      } catch (refreshError) {
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
