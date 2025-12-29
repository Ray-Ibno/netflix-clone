const generateClassForSearchType = (searchType: string) => {
  switch (searchType) {
    case 'movie':
      return 'bg-red-600'
    case 'person':
      return 'bg-blue-600'
    case 'tv':
      return 'bg-green-600'
  }
}
export default generateClassForSearchType
