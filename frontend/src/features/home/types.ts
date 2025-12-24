export type Content = {
  content: {
    id: string
    poster_path: string
    title?: string
    name?: string
    release_date?: string
    first_air_date?: string
    adult: boolean
    overview: string
  }
}

export type ContentCategory =
  | 'now_playing'
  | 'top_rated'
  | 'popular'
  | 'upcoming'
  | 'airing_today'
  | 'on_the_air'
