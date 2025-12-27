export type Similar = {
  id: string
  title?: string
  name?: string
  poster_path: string
}[]

export type Trailers = {
  key: string
}[]

export type ContentDetails = {
  adult: boolean
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
  overview: string
  poster_path: string
}
