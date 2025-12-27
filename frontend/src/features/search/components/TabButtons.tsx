type TabButtonsProp<T> = {
  activeTab: T
  handleTabClick: (tab: T) => void
}

const TabButtons = <T,>({ activeTab, handleTabClick }: TabButtonsProp<T>) => {
  return (
    <div className="flex justify-center gap-3 mb-4">
      {['Movie', 'TV Show', 'People'].map((item) => (
        <button
          key={item}
          className={`py-2 px-4 rounded ${
            activeTab === item ? 'bg-red-600' : 'bg-gray-800'
          } hover:bg-red-700 cursor-pointer`}
          onClick={() => handleTabClick(item as T)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
export default TabButtons
