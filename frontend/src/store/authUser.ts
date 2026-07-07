import { create } from 'zustand'
import axios from 'axios'
import { api } from '../lib/api'
import toast from 'react-hot-toast'

type User = {
  email: string
  username: string
  password: string
  passwordRepeat: string
  image: string
  searchHistory: []
}

type AuthState = {
  user: Pick<User, 'username' | 'image' | 'searchHistory'> | null
  accessToken: string | null
  isGettingUser: boolean
  isLoading: boolean
  refreshAccessToken: () => Promise<string> | null
  getAuthUser: () => void
  signup: (credentials: Pick<User, 'email' | 'username' | 'password' | 'passwordRepeat'>) => void
  login: (credentials: Pick<User, 'username' | 'password'>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isGettingUser: true,
  isLoading: false,
  errorMessage: null,
  refreshAccessToken: async () => {
    try {
      const response = await axios.post('/api/v1/auth/refresh', {}, { withCredentials: true })

      const token = response.data.accessToken
      set({ accessToken: token })
      return token
    } catch {
      set({ accessToken: null, user: null })
      return null
    }
  },
  getAuthUser: async () => {
    let currentAccessToken = get().accessToken

    if (!currentAccessToken) {
      currentAccessToken = await get().refreshAccessToken()
    }

    if (!currentAccessToken) {
      set({ isGettingUser: false })
      return
    }

    try {
      const response = await api.get('/auth/authCheck')
      set(() => ({ user: response.data, isGettingUser: false }))
    } catch {
      set(() => ({ user: null, isGettingUser: false }))
    }
  },
  signup: async (credentials) => {
    set(() => ({ isLoading: true }))
    try {
      const response = await api.post('/auth/signup', credentials)
      set(() => ({
        user: response.data.user,
        accessToken: response.data.accessToken,
        isLoading: false,
      }))
      toast.success('Account created successfully')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('An unknown error occured')
      }
      set(() => ({ isLoading: false }))
    }
  },
  login: async (credentials) => {
    set(() => ({ isLoading: true }))
    try {
      const response = await api.post('/auth/login', credentials)
      set(() => ({
        user: response.data.user,
        accessToken: response.data.accessToken,
        isLoading: false,
      }))
      toast.success('Logged in successfully')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('An unknown error occured')
      }
      set(() => ({ isLoading: false }))
    }
  },
  logout: async () => {
    set(() => ({ isLoading: true }))
    try {
      await api.post('/auth/logout')
      set(() => ({ user: null, isLoading: false }))
      toast.success('Logged out successfully')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('An unknown error occured')
      }
    }
    set(() => ({ isLoading: false }))
  },
}))
