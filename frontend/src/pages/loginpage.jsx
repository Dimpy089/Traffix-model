import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import { loginUser } from '../services/authservices'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // ── Form state ─────────────────────────────────────
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // ── Update one field at a time ──────────────────────
  // Using computed key [field] so one function handles all inputs
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear that field's error as user types
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  // ── Validation ──────────────────────────────────────
  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    return newErrors
  }

  // ── Submit ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Run validation first
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      //call backend 
      const response = await loginUser(form)

   //backend send token only in respond 
      
          const {  token } = response.data
  //save respnse from backend 
         login( token)

      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // ── UI ──────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4"
         style={{ backgroundColor: 'var(--bg-page)' }}>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8"
           style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>

        {/* Logo + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
               style={{ backgroundColor: 'var(--color-primary)' }}>
            <Shield className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Welcome back
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Sign in to TraffixAI
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium mb-1.5"
                   style={{ color: 'var(--text-secondary)' }}>
              Email
            </label>
            <div className="relative">
              {/* Left icon */}
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: `1px solid ${errors.email ? 'var(--color-danger)' : 'var(--border)'}`,
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            {/* Inline error */}
            {errors.email && (
              <p className="flex items-center gap-1 text-xs mt-1"
                 style={{ color: 'var(--color-danger)' }}>
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium"
                     style={{ color: 'var(--text-secondary)' }}>
                Password
              </label>
              <Link to="/forgot-password"
                    className="text-xs hover:underline"
                    style={{ color: 'var(--color-primary-mid)' }}>
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: `1px solid ${errors.password ? 'var(--color-danger)' : 'var(--border)'}`,
                  color: 'var(--text-primary)',
                }}
              />
              {/* Toggle password visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="flex items-center gap-1 text-xs mt-1"
                 style={{ color: 'var(--color-danger)' }}>
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              backgroundColor: loading ? 'var(--color-primary-mid)' : 'var(--color-primary)',
              cursor: loading ? 'wait' : 'pointer',
            }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/signup"
                className="font-medium hover:underline"
                style={{ color: 'var(--color-primary-mid)' }}>
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}