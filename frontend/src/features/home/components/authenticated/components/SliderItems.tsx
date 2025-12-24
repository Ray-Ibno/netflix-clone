import { Link } from 'react-router-dom'
import type { Content } from '../../../types'
import { SMALL_IMG_BASE_URL } from '../../../../../utils/constanst'

type SliderItemsProp = {
  content: Content['content'][] | undefined
}

const SliderItems = ({ content }: SliderItemsProp) => {
  return (
    <>
      {content?.map((content) => (
        <Link
          key={content.id}
          to={`/watch/${content.id}`}
          className="min-w-62.5 relative group"
        >
          <div className="rounded-lg overflow-hidden">
            <img
              src={`${SMALL_IMG_BASE_URL}${content.poster_path}`}
              alt="Movie Image"
              className="transition-transform duration-300 ease-in-out group-hover:scale-125"
            />
          </div>
          <p className="mt-2 text-center">{content.name || content.title}</p>
        </Link>
      ))}
    </>
  )
}
export default SliderItems
