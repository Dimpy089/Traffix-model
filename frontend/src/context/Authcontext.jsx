import { createContext, useState } from 'react'

// 1. Create the context — this is just an empty box for now
export const AuthContext = createContext()

export function AuthProvider({ children }) {
  // 2. User state — null means "not logged in"
  //    We read from localStorage so login survives page refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  // 3. Token state — JWT from your backend
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })

  // 4. Loading state — true while we check localStorage on first load
  const [loading, setLoading] = useState(false)

  // 5. Login function — called from LoginPage after successful API response
  const login = (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)


//    Why localStorage?

// Without it:

// Refresh Page

// Everything disappears.


    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', jwtToken)
  }

  // 6. Logout — clear everything
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // 7. isAuthenticated — simple boolean any component can check
  const isAuthenticated = !!user && !!token

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  )
}    