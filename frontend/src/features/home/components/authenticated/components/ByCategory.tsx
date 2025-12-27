import { useContentStore } from '../../../../../store/content'
import { MOVIE_CATEGORIES, TV_CATEGORIES } from '../../../../../utils/constanst'
import Slider from './Slider'

const ByCategory = () => {
  const { contentType } = useContentStore()

  return (
    <div className="flex flex-col gap-10 bg-black py-10">
      {contentType === 'movie'
        ? MOVIE_CATEGORIES.map((category) => <Slider key={category} category={category} />)
        : TV_CATEGORIES.map((category) => <Slider key={category} category={category} />)}
    </div>
  )
}
export default ByCategory
