import { useState } from 'react'
import type { LoginType } from '../types'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../../store/authUser'

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginType>({
    username: '',
    password: '',
  })

  const { login } = useAuthStore()

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(formData)
  }
  return (
    <>
      <form onSubmit={handleSubmitForm} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-300 block"
          >
            Username
          </label>
          <input
            value={formData.username}
            type="text"
            className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            placeholder="example"
            id="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300 block"
            >
              Password
            </label>
            <input
              value={formData.password}
              type="password"
              className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
              placeholder="•••••••••••"
              id="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>
        <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
          Log in
        </button>
      </form>
      <div className="text-center text-gray-400">
        Don't have an account yet?{' '}
        <Link className="text-red-500 hover:underline" to={'/signup'}>
          Sign up
        </Link>
      </div>
    </>
  )
}
export default LoginForm
