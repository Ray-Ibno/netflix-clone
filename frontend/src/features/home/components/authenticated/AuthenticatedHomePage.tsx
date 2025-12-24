import Navbar from '../Navbar'
import Hero from './components/Hero'
import ByCategory from './components/ByCategory'

import useGetTrendingContent from '../../hooks/useGetTrendingContent'

const AuthenticatedHomePage = () => {
  const { data: trendingContent, isRefetching } = useGetTrendingContent()

  if (!trendingContent || isRefetching)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    )

  return (
    <>
      <Hero trendingContent={trendingContent} />
      <ByCategory />
    </>
  )
}
export default AuthenticatedHomePage
