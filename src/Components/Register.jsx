import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const URL = import.meta.env.VITE_BASE_URL

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({ username: '', password: '', email: '' })

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      .split('=')[1] // Extract CSRF token from cookies
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken, // Include CSRF token in request headers
      },
      credentials: 'include', // Important: Include cookies in the request
      body: JSON.stringify(user),
    }

    try {
      const res = await fetch(`${URL}/api/auth/register`, options)
      if (!res.ok) throw new Error('Registration failed')

      navigate('/dashboard') // Navigate to /dashboard on success
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  // BUILD OUT YOUR FORM PROPERLY WITH LABELS AND WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            onChange={handleChange}
            autoComplete="username"
          />
        </label>
        <br />

        <label htmlFor="email">
          <input
            id="email"
            value={user.email}
            type="email"
            placeholder="email"
            onChange={handleChange}
            autoComplete="email"
          />
        </label>
        <br />
        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
