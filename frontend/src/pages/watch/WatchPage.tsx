import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Navbar from '../../components/Navbar'
import {
  ArrowButtons,
  formatReleaseDate,
  SimilarContent,
  VideoPlayer,
  Skeleton,
} from '../../features/watch'

import {
  useGetTrailers,
  useGetSimilar,
  useGetDetails,
} from '../../features/watch'

import { ORIGINAL_IMG_BASE_URL } from '../../utils/constanst'

const WatchPage = () => {
  const { id } = useParams()
  const { data: trailers, isFetching: isFetchingTrailers } = useGetTrailers(id)
  const { data: similar, isFetching: isFetchingSimilar } = useGetSimilar(id)
  const { data: details, isFetching: isFetchingDetails } = useGetDetails(id)

  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (
    !trailers &&
    !similar &&
    !details &&
    (!isFetchingDetails || !isFetchingSimilar || !isFetchingTrailers)
  ) {
    return (
      <div className="bg-black h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found
            </h2>
          </div>
        </div>
      </div>
    )
  }

  if (
    !trailers ||
    !similar ||
    !details ||
    isFetchingTrailers ||
    isFetchingSimilar ||
    isFetchingDetails
  ) {
    return (
      <div className="min-h-screen bg-black p-10">
        <Skeleton />
      </div>
    )
  }

  const handleNext = () => {
    if (currentTrailerIndex === trailers.length - 1) return
    setCurrentTrailerIndex((prevIndex) => prevIndex + 1)
  }

  const handlePrev = () => {
    if (currentTrailerIndex === 0) return
    setCurrentTrailerIndex((prevIndex) => prevIndex - 1)
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers.length > 0 && (
          <ArrowButtons
            currentTrailerIndex={currentTrailerIndex}
            numOfTrailers={trailers.length - 1}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}

        <VideoPlayer
          numOfTrailers={trailers.length}
          title={`${details.original_title || details.original_name}`}
          vidKey={`${trailers[currentTrailerIndex].key}`}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {details.original_title || details.original_name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                details.release_date || details.first_air_date
              )}{' '}
              |{' '}
              {details.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-2 text-lg">{details.overview}</p>
          </div>
          <img
            src={`${ORIGINAL_IMG_BASE_URL}${details.poster_path}`}
            alt="Poster Image"
            className="max-h-150 rounded-md"
          />
        </div>

        {similar.length > 0 && <SimilarContent similarContent={similar} />}
      </div>
    </div>
  )
}
export default WatchPage
