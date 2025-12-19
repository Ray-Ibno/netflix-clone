import { AuthenticatedHomePage, GuestHomePage } from '../../features/home'
import { useAuthStore } from '../../store/authUser'

const HomePage = () => {
  const { user } = useAuthStore()

  return <>{user ? <AuthenticatedHomePage /> : <GuestHomePage />}</>
}
export default HomePage
