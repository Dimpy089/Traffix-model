import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
// import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {/* AuthProvider wraps routes so every page can access user state */}
        <AuthProvider>
          <AppRoutes />
          <Toaster
        //   Displays popup notifications at the top-right corner
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}