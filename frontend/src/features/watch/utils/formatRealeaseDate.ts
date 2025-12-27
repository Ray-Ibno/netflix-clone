const formatReleaseDate = (date?: string) => {
  if (!date) return null

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default formatReleaseDate
