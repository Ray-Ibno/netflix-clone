import { AuthenticatedHomePage, GuestHomePage } from '../../features/home'

const HomePage = () => {
  const user = false
  return <div>{user ? <AuthenticatedHomePage /> : <GuestHomePage />}</div>
}
export default HomePage
