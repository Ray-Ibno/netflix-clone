import { ChevronLeft, ChevronRight } from 'lucide-react'

type ArrowButtonsProps = {
  currentTrailerIndex: number
  numOfTrailers: number
  handleNext: () => void
  handlePrev: () => void
}

const ArrowButtons = ({
  currentTrailerIndex,
  numOfTrailers,
  handleNext,
  handlePrev,
}: ArrowButtonsProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        className={`bg-gray-500/70 hover:bg-gray-500 py-2 px-4 rounded ${
          currentTrailerIndex === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        disabled={currentTrailerIndex === 0}
        onClick={handlePrev}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className={`bg-gray-500/70 hover:bg-gray-500 py-2 px-4 rounded ${
          currentTrailerIndex === numOfTrailers ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        disabled={currentTrailerIndex === numOfTrailers}
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
export default ArrowButtons
