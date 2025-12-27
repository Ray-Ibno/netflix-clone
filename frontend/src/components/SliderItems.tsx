import { Link } from 'react-router-dom'
import { SMALL_IMG_BASE_URL } from '../utils/constanst'

type SliderItemsProp = {
  content:
    | {
        id: string
        poster_path: string
        name?: string
        title?: string
      }[]
    | undefined
}

const SliderItems = ({ content }: SliderItemsProp) => {
  return (
    <>
      {content?.map((content) =>
        !content.poster_path ? null : (
          <Link
            key={content.id}
            to={`/watch/${content.id}`}
            className="min-w-62.5 relative group"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={`${SMALL_IMG_BASE_URL}${content.poster_path}`}
                alt="Poster Image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">{content.name || content.title}</p>
          </Link>
        )
      )}
    </>
  )
}
export default SliderItems
