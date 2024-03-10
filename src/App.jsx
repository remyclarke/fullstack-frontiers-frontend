import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import ProtectedRoute from './Components/ProtectedRoute'
import Register from './Components/Register'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to the Auth Starter</h1>
              <Link to="/login">Login</Link>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
