import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Navbar from '../../components/Navbar'
import { ArrowButtons, SimilarContent, VideoPlayer, Skeleton, Details } from '../../features/watch'

import { useGetTrailers, useGetSimilar, useGetDetails } from '../../features/watch'

const WatchPage = () => {
  const { id } = useParams()
  const { data: trailers, isFetching: isFetchingTrailers } = useGetTrailers(id)
  const { data: similar, isFetching: isFetchingSimilar } = useGetSimilar(id)
  const { data: details, isFetching: isFetchingDetails } = useGetDetails(id)

  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (isFetchingTrailers || isFetchingSimilar || isFetchingDetails) {
    return (
      <div className="min-h-screen bg-black p-10">
        <Skeleton />
      </div>
    )
  }

  if (
    !trailers &&
    !similar &&
    !details &&
    !isFetchingDetails &&
    !isFetchingSimilar &&
    !isFetchingTrailers
  ) {
    return (
      <div className="bg-black h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">Content not found</h2>
          </div>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (!!trailers && currentTrailerIndex === trailers.length - 1) return
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

        {!!trailers &&
          trailers.length > 0 && (
            <ArrowButtons
              currentTrailerIndex={currentTrailerIndex}
              numOfTrailers={trailers.length - 1}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          ) && (
            <VideoPlayer
              numOfTrailers={trailers?.length}
              title={`${details?.original_title || details?.original_name}`}
              vidKey={`${trailers && trailers[currentTrailerIndex].key}`}
            />
          )}

        <Details details={details} />

        {similar && similar.length > 0 && <SimilarContent similarContent={similar} />}
      </div>
    </div>
  )
}
export default WatchPage
