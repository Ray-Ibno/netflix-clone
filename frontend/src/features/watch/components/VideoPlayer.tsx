import ReactPlayer from 'react-player'

type VideoPlayerProps = {
  numOfTrailers: number
  title: string
  vidKey: string
}

const VideoPlayer = ({ numOfTrailers, title, vidKey }: VideoPlayerProps) => {
  return (
    <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
      {numOfTrailers > 0 && (
        <ReactPlayer
          controls={true}
          width={'100%'}
          height={'70vh'}
          className="mx-auto overflow-hidden rounded-lg"
          src={`https://www.youtube.com/watch?v=${vidKey}`}
        />
      )}

      {numOfTrailers === 0 && (
        <h2 className="text-lg text-center mt-5">
          No trailers available for <span className="font-bold text-red-600">{title}</span>
        </h2>
      )}
    </div>
  )
}
export default VideoPlayer
