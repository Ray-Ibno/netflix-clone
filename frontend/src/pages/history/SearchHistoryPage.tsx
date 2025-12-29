import { LoaderCircle, Trash } from 'lucide-react'
import Navbar from '../../components/Navbar'
import {
  formatDate,
  generateClassForSearchType,
  useDeleteHistory,
  useGetHistory,
} from '../../features/history'
import { SMALL_IMG_BASE_URL } from '../../utils/constanst'

const SearchHistoryPage = () => {
  const { data: searchHistory, isLoading } = useGetHistory()
  const { mutate: deleteHistory } = useDeleteHistory()

  const handleDelete = (id: string) => {
    deleteHistory(id)
  }

  if (!searchHistory || isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <LoaderCircle size={32} className="animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((history) => (
            <div key={history.createdAt} className="bg-gray-800 p-4 rounded flex items-start">
              <img
                src={`${SMALL_IMG_BASE_URL}${history.image}`}
                alt="History result image"
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-lg">{history.name}</span>
                <span className="text-gray-400 text-sm">{formatDate(history.createdAt)}</span>
              </div>
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${generateClassForSearchType(
                  history.searchType
                )}`}
              >
                {history.searchType[0].toUpperCase() + history.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(history.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SearchHistoryPage
