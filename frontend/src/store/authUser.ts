import { create } from 'zustand'
import axios from 'axios'
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
  isGettingUser: boolean
  isLoading: boolean
  getAuthUser: () => void
  signup: (credentials: Pick<User, 'email' | 'username' | 'password' | 'passwordRepeat'>) => void
  login: (credentials: Pick<User, 'username' | 'password'>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isGettingUser: true,
  isLoading: false,
  errorMessage: null,
  getAuthUser: async () => {
    try {
      const response = await axios.get('/api/v1/auth/authCheck')
      set(() => ({ user: response.data, isGettingUser: false }))
    } catch {
      set(() => ({ user: null, isGettingUser: false }))
    }
  },
  signup: async (credentials) => {
    set(() => ({ isLoading: true }))
    try {
      const response = await axios.post('/api/v1/auth/signup', credentials)
      set(() => ({ user: response.data, isLoading: false }))
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
      const response = await axios.post('/api/v1/auth/login', credentials)
      set(() => ({ user: response.data, isLoading: false }))
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
      await axios.post('/api/v1/auth/logout')
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
