import { LogOut, Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../../store/authUser'
import { useState } from 'react'
import { useContentStore } from '../../../store/content'

const Navbar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const { setContentType } = useContentStore()

  const navItems = [
    {
      label: 'Movie',
      path: '/',
      fn: () => {
        setContentType('movie')
      },
    },
    {
      label: 'Shows',
      path: '/',
      fn: () => {
        setContentType('tv')
      },
    },
    { label: 'Search History', path: '/history' },
  ]

  const toggleHamburgerMenu = () => setIsHamburgerOpen(!isHamburgerOpen)

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to={'/'}>
          <img
            src="netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        <ul className="hidden sm:flex gap-2 items-center">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="hover:underline"
                onClick={item.fn}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={'/search'}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user?.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />

        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer"
            onClick={toggleHamburgerMenu}
          />
        </div>
      </div>

      {isHamburgerOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          {navItems.map((item) => (
            <Link
              to={item.path}
              className="block hover:underline p-2"
              onClick={toggleHamburgerMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
export default Navbar
