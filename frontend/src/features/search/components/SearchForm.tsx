import { Search } from 'lucide-react'
import type { FormEvent } from 'react'

type SearchFormProps<T> = {
  searchValue: string
  activeTab: T
  setSearchValue: (value: T) => void
  handleSearch: (e: FormEvent<HTMLFormElement>) => void
}

const SearchForm = <T,>(props: SearchFormProps<T>) => {
  return (
    <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={props.handleSearch}>
      <input
        type="text"
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value as T)}
        placeholder={`Search for a ${props.activeTab === 'People' ? 'Person' : props.activeTab}`}
        className="w-full p-2 rounded bg-gray-800"
      />
      <button className="bg-red-600 hover:bg-red-700 p-2 rounded">
        <Search className="size-6" />
      </button>
    </form>
  )
}
export default SearchForm
