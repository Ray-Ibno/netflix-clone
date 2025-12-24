import { create } from 'zustand'

type ContentState = {
  contentType: 'movie' | 'tv'
  setContentType: (type: 'movie' | 'tv') => void
}

export const useContentStore = create<ContentState>((set) => ({
  contentType: 'movie',
  setContentType: (type) => set(() => ({ contentType: type })),
}))
