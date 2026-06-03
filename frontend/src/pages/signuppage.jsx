import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, Mail, Lock, User, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors,       setErrors]       = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm,  setShowConfirm]  = useState(false)
  const [agreed,       setAgreed]       = useState(false)
  const [loading,      setLoading]      = useState(false)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())
      e.name = 'Name is required'

    if (!form.email.trim())
      e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email'

    if (!form.password)
      e.password = 'Password is required'
    else if (form.password.length < 6)
      e.password = 'At least 6 characters'

    if (!form.confirmPassword)
      e.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match'

    if (!agreed)
      e.terms = 'You must agree to the terms'

    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      // TODO Phase 4: replace with → await api.signup(form)
      await new Promise(resolve => setTimeout(resolve, 1000))

      const fakeUser  = { id: 2, name: form.name, email: form.email }
      const fakeToken = 'demo-jwt-token-456'

      login(fakeUser, fakeToken)
      toast.success('Account created! Welcome 🎉')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Reusable input style — same look as LoginPage
  const inputStyle = (field) => ({
    backgroundColor: 'var(--bg-surface)',
    border: `1px solid ${errors[field] ? 'var(--color-danger)' : 'var(--border)'}`,
    color: 'var(--text-primary)',
  })

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
         style={{ backgroundColor: 'var(--bg-page)' }}>

      <div className="w-full max-w-md rounded-2xl shadow-xl p-8"
           style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
               style={{ backgroundColor: 'var(--color-primary)' }}>
            <Shield className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Create account
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Join TraffixAI today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5"
                   style={{ color: 'var(--text-secondary)' }}>
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Your full name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle('name')}
              />
            </div>
            {errors.name && (
              <p className="flex items-center gap-1 text-xs mt-1"
                 style={{ color: 'var(--color-danger)' }}>
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1.5"
                   style={{ color: 'var(--text-secondary)' }}>
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle('email')}
              />
            </div>
            {errors.email && (
              <p className="flex items-center gap-1 text-xs mt-1"
                 style={{ color: 'var(--color-danger)' }}>
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1.5"
                   style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle('password')}
              />
              <button type="button"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1.5"
                   style={{ color: 'var(--text-secondary)' }}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }} />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={e => handleChange('confirmPassword', e.target.value)}
                placeholder="Re-enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none"
                style={inputStyle('confirmPassword')}
              />
              <button type="button"
                      onClick={() => setShowConfirm(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--text-muted)' }}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="flex items-center gap-1 text-xs mt-1"
                 style={{ color: 'var(--color-danger)' }}>
                <AlertCircle size={12} /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms checkbox */}
          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => {
                  setAgreed(e.target.checked)
                  if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }))
                }}
                className="mt-0.5 accent-[#0F6E56]"
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                I agree to the{' '}
                <span className="underline cursor-pointer"
                      style={{ color: 'var(--color-primary-mid)' }}>
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="underline cursor-pointer"
                      style={{ color: 'var(--color-primary-mid)' }}>
                  Privacy Policy
                </span>
              </span>
            </label>
            {errors.terms && (
              <p className="flex items-center gap-1 text-xs mt-1"
                 style={{ color: 'var(--color-danger)' }}>
                <AlertCircle size={12} /> {errors.terms}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all mt-2"
            style={{
              backgroundColor: loading ? 'var(--color-primary-mid)' : 'var(--color-primary)',
              cursor: loading ? 'wait' : 'pointer',
            }}>
            {loading ? 'Creating account…' : 'Create account →'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login"
                className="font-medium hover:underline"
                style={{ color: 'var(--color-primary-mid)' }}>
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}