import { useRef, useState } from 'react'
import { useContentStore } from '../../../../../store/content'

import type { ContentCategory } from '../../../types'
import SliderItems from '../../../../../components/SliderItems'
import useGetByCategoryContent from '../../../hooks/useGetByCategoryContent'
import SliderBtns from '../../../../../components/SliderBtns'

const Slider = ({ category }: { category: ContentCategory }) => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)

  const { data: contentByCategory } = useGetByCategoryContent(category)

  const { contentType } = useContentStore()

  const categoryName = `${category[0].toUpperCase()}${category
    .slice(1)
    .replaceAll('_', ' ')} ${contentType === 'movie' ? 'Movies' : 'TV Shows'}`

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
      {isButtonsVisible && <SliderBtns slideRef={slideRef} />}
    </div>
  )
}
export default Slider
