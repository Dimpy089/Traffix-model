import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute        from './ProtectedRoute'
import LoginPage             from '../pages/loginPage'
import SignupPage            from '../pages/signupPage'
import ForgotPasswordPage    from '../pages/forgotpasswordPage'
import DashboardPage from '../pages/dashboard/dashboardpage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes — anyone can access */}
      <Route path="/login"           element={<LoginPage />} />
      <Route path="/signup"          element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected routes — must be logged in */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />

   {/* Match any route that was not matched by previous routes. */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}