import { Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './pages/home/HomePage'
import LoginPage from './pages/authentication/LoginPage'
import SignUpPage from './pages/authentication/SignUpPage'
import WatchPage from './pages/watch/WatchPage'
import SearchPage from './pages/search/SearchPage'
import Footer from './components/Footer'

import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

function App() {
  const { user, getAuthUser, isGettingUser } = useAuthStore()

  useEffect(() => {
    getAuthUser()
  }, [getAuthUser])

  if (isGettingUser) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={'/'} />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={'/login'} />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={'/login'} />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
