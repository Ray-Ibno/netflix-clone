import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import type { SignUpType } from '../types'
import { useAuthStore } from '../../../store/authUser'

const SignupForm = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const { signup } = useAuthStore()

  const [formData, setFormData] = useState<SignUpType>({
    email: email || '',
    username: '',
    password: '',
    passwordRepeat: '',
  })

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signup(formData)
  }

  return (
    <>
      <form onSubmit={handleSubmitForm} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
            Email
          </label>
          <input
            value={formData.email || ''}
            type="email"
            className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            placeholder="example@gmail.com"
            id="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="username" className="text-sm font-medium text-gray-300 block">
            Username
          </label>
          <input
            value={formData.username || ''}
            type="text"
            className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            placeholder="example"
            id="username"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
              Password
            </label>
            <input
              value={formData.password || ''}
              type="password"
              className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
              placeholder="•••••••••••"
              id="password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div>
              <label htmlFor="repeat" className="text-sm font-medium text-gray-300 block">
                Re-type Password
              </label>
              <input
                value={formData.passwordRepeat || ''}
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="•••••••••••"
                id="repeat"
                onChange={(e) => setFormData({ ...formData, passwordRepeat: e.target.value })}
              />
            </div>
          </div>
        </div>
        <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
          Sign up
        </button>
      </form>
      <div className="text-center text-gray-400">
        Already a member?{' '}
        <Link className="text-red-500 hover:underline" to={'/login'}>
          Sign in
        </Link>
      </div>
    </>
  )
}
export default SignupForm
