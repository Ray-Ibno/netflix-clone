import { useRef, useState } from 'react'
import { useContentStore } from '../../../../../store/content'

import type { ContentCategory } from '../../../types'
import SliderItems from './SliderItems'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useGetByCategoryContent from '../../../hooks/useGetByCategoryContent'

const Slider = ({ category }: { category: ContentCategory }) => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)

  const { data: contentByCategory } = useGetByCategoryContent(category)

  const { contentType } = useContentStore()

  const categoryName = `${category[0].toUpperCase()}${category
    .slice(1)
    .replaceAll('_', ' ')} ${contentType === 'movie' ? 'Movies' : 'TV Shows'}`

  const scrollRight = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({
        left: slideRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  const scrollLeft = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({
        left: -slideRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      className="bg-black relative px-5 md:px-20"
      onMouseEnter={() => setIsButtonsVisible(true)}
      onMouseLeave={() => setIsButtonsVisible(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">{categoryName}</h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={slideRef}
      >
        <SliderItems content={contentByCategory} />
      </div>
      {isButtonsVisible && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black opacity-50 hover:opacity-75 z-10 cursor-pointer"
          >
            {<ChevronLeft size={24} />}
          </button>

          <button
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center size-12 rounded-full bg-black opacity-50 hover:opacity-75 z-10 cursor-pointer"
          >
            {<ChevronRight size={24} />}
          </button>
        </>
      )}
    </div>
  )
}
export default Slider
