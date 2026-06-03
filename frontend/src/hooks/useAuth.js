import { useContext } from 'react'
import { AuthContext } from '../context/Authcontext'

// Custom hook — components import this instead of AuthContext directly
// Keeps imports clean and gives a helpful error if used outside AuthProvider
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
