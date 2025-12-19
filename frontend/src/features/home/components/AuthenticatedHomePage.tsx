import { useAuthStore } from '../../../store/authUser'

const AuthenticatedHomePage = () => {
  const { logout } = useAuthStore()
  return (
    <div className="hero-bg h-screen">
      <h1 className="text-white">AuthenticatedHomePage</h1>
      <button className="bg-white" onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}
export default AuthenticatedHomePage
