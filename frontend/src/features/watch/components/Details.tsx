import { ORIGINAL_IMG_BASE_URL } from '../../../utils/constanst'
import type { ContentDetails } from '../types'
import formatReleaseDate from '../utils/formatRealeaseDate'

const Details = ({ details }: { details: ContentDetails | undefined }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
      <div className="mb-4 md:mb-0">
        <h2 className="text-5xl font-bold text-balance">
          {details?.original_title || details?.original_name}
        </h2>

        <p className="mt-2 text-lg">
          {formatReleaseDate(details?.release_date || details?.first_air_date)} |{' '}
          {details?.adult ? (
            <span className="text-red-600">18+</span>
          ) : (
            <span className="text-green-600">PG-13</span>
          )}
        </p>
        <p className="mt-2 text-lg">{details?.overview}</p>
      </div>
      <img
        src={`${ORIGINAL_IMG_BASE_URL}${details?.poster_path}`}
        alt="Poster Image"
        className="max-h-150 rounded-md"
      />
    </div>
  )
}
export default Details
