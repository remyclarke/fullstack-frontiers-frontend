import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const URL = import.meta.env.VITE_BASE_URL
const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({ username: '', password: '' })

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
      const res = await fetch(`${URL}/api/auth/login`, options)
      if (!res.ok) {
        alert('Login failed')
        setUser({ username: '', password: '' })
        throw new Error('Registration failed')
      }

      navigate('/dashboard')
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  async function handleSignIn(e) {
    e.preventDefault()
    const demoUser = { username: 'demo', password: 'pass' }

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
      body: JSON.stringify(demoUser),
    }

    try {
      const res = await fetch(`${URL}/api/auth/login`, options)
      if (!res.ok) {
        alert('Login failed')
        setUser({ username: '', password: '' })
        throw new Error('Registration failed')
      }

      navigate('/dashboard')
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  // BUILD OUT YOUR FORM PROPERLY WITH LABELS AND WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE

  return (
    <div>
      <h2>Use the DemoUser button to login and save time during demo</h2>
      <h3> Remove the 'br' tags and these instructions if you use this code</h3>
      <button onClick={handleSignIn}>Demo User</button>
      <br />
      <br />
      <br />
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          value={user.username}
          type="text"
          placeholder="username"
          autoComplete="username"
          onChange={handleChange}
        />
        <br />
        <input
          id="password"
          value={user.password}
          type="password"
          placeholder="password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <br />
        <button>Submit</button>
      </form>
      <p>
        No Account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
