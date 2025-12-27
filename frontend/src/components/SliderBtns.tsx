import { ChevronLeft, ChevronRight } from 'lucide-react'

type SliderProps = {
  slideRef: React.RefObject<HTMLDivElement | null>
}

const SliderBtns = ({ slideRef }: SliderProps) => {
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
    <>
      <ChevronLeft
        onClick={scrollLeft}
        className="absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center 
        justify-center size-12 rounded-full bg-black opacity-50 hover:opacity-75 z-10 cursor-pointer"
      />

      <ChevronRight
        onClick={scrollRight}
        className="absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center 
        justify-center size-12 rounded-full bg-black opacity-50 hover:opacity-75 z-10 cursor-pointer"
      />
    </>
  )
}
export default SliderBtns
