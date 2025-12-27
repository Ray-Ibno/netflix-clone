import { useState, type FormEvent } from 'react'
import Navbar from '../../components/Navbar'
import { useContentStore } from '../../store/content'
import { SearchForm, TabButtons, useGetSearchResults, Skeleton } from '../../features/search'
import { Link } from 'react-router-dom'
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constanst'

type ActiveTab = 'Movie' | 'TV Show' | 'People'

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Movie')
  const [searchValue, setSearchValue] = useState('')
  const { setContentType } = useContentStore()
  const {
    getSearchContentResults,
    clearResutls,
    data: searchResults,
    isLoading,
    error,
  } = useGetSearchResults(activeTab, searchValue)

  const handleTabClick = (tab: ActiveTab) => {
    clearResutls()
    setSearchValue('')
    setActiveTab(tab)
    if (tab === 'Movie') setContentType('movie')
    if (tab === 'TV Show') setContentType('tv')
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getSearchContentResults()
    console.log(searchResults)
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <TabButtons activeTab={activeTab} handleTabClick={handleTabClick} />

        <SearchForm
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          activeTab={activeTab}
          handleSearch={handleSearch}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : error ? (
          <h2 className="text-xl text-center font-bold">
            {error === 404 ? 'No Results Found' : 'Something Went Wrong'}
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults?.map((result) => {
              if (!result.poster_path && !result.profile_path) return null

              return (
                <div key={result.id} className="bg-gray-800 p-4 rounded">
                  {activeTab === 'People' ? (
                    <Link to={`/actor/${result.name}`} className="flex flex-col items-center">
                      <img
                        src={`${ORIGINAL_IMG_BASE_URL}${result.profile_path}`}
                        alt={result.name}
                        className="max-h-96 rounded mx-auto"
                      />
                      <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                    </Link>
                  ) : (
                    <Link to={`/watch/${result.id}`}>
                      <img
                        src={`${ORIGINAL_IMG_BASE_URL}${result.poster_path}`}
                        alt="Poster Image"
                        className="w-full h-auto rounded"
                      />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
export default SearchPage
