import { useContentStore } from '../../../store/content'
import type { Similar } from '../types'

import SliderBtns from '../../../components/SliderBtns'
import { useRef, useState } from 'react'
import SliderItems from '../../../components/SliderItems'

type SimilarContentProp = {
  similarContent: Similar
}

const SimilarContent = ({ similarContent }: SimilarContentProp) => {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false)
  const { contentType } = useContentStore()
  const slideRef = useRef<HTMLDivElement | null>(null)
  return (
    <div
      className="m-12 max-w-7xl mx-auto px-5 md:px-20 relative"
      onMouseEnter={() => setIsButtonsVisible(true)}
      onMouseLeave={() => setIsButtonsVisible(false)}
    >
      <h3 className="text-3xl font-bold mb-4">
        Similar {contentType === 'movie' ? 'Movies' : 'TV Shows'}
      </h3>

      <div
        className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
        ref={slideRef}
      >
        <SliderItems content={similarContent} />
      </div>
      {isButtonsVisible && <SliderBtns slideRef={slideRef} />}
    </div>
  )
}
export default SimilarContent
