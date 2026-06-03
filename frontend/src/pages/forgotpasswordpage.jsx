import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Mail, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  // Step tracking — 'form' shows input, 'sent' shows success screen
  const [step, setStep] = useState('form')

  const validate = () => {
    if (!email.trim())              return 'Email is required'
    if (!/\S+@\S+\.\S+/.test(email)) return 'Enter a valid email'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    try {
      // TODO Phase 4: replace with → await api.forgotPassword(email)
      await new Promise(resolve => setTimeout(resolve, 1200))
      setStep('sent')
      toast.success('Reset link sent!')
    } catch {
      toast.error('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
         style={{ backgroundColor: 'var(--bg-page)' }}>

      <div className="w-full max-w-md rounded-2xl shadow-xl p-8"
           style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>

        {/* ── Step 1: Email form ───────────────────── */}
        {step === 'form' && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                   style={{ backgroundColor: 'var(--color-primary)' }}>
                <Shield className="text-white" size={28} />
              </div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Forgot password?
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Enter your email and we'll send a reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5"
                       style={{ color: 'var(--text-secondary)' }}>
                  Email address
                </label>
                <div className="relative">
                  <Mail size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: `1px solid ${error ? 'var(--color-danger)' : 'var(--border)'}`,
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
                {error && (
                  <p className="flex items-center gap-1 text-xs mt-1"
                     style={{ color: 'var(--color-danger)' }}>
                    <AlertCircle size={12} /> {error}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  backgroundColor: loading
                    ? 'var(--color-primary-mid)'
                    : 'var(--color-primary)',
                  cursor: loading ? 'wait' : 'pointer',
                }}>
                {loading ? 'Sending…' : 'Send reset link →'}
              </button>
            </form>

            {/* Back to login */}
            <div className="mt-6 text-center">
              <Link to="/login"
                    className="inline-flex items-center gap-1 text-sm hover:underline"
                    style={{ color: 'var(--text-secondary)' }}>
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </div>
          </>
        )}

        {/* ── Step 2: Success screen ───────────────── */}
        {step === 'sent' && (
          <div className="text-center py-4">
            {/* Success icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                 style={{ backgroundColor: 'var(--color-primary-lit)' }}>
              <CheckCircle size={36} style={{ color: 'var(--color-primary)' }} />
            </div>

            <h2 className="text-xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}>
              Check your inbox
            </h2>

            <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
              We sent a password reset link to
            </p>

            {/* Show the email they entered */}
            <p className="text-sm font-semibold mb-6"
               style={{ color: 'var(--color-primary)' }}>
              {email}
            </p>

            <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
              Didn't receive it? Check your spam folder or try again.
            </p>

            {/* Resend button — resets back to form */}
            <button
              onClick={() => setStep('form')}
              className="w-full py-2.5 rounded-xl text-sm font-medium mb-3"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}>
              Try a different email
            </button>

            <Link to="/login"
                  className="block w-full py-2.5 rounded-xl text-sm font-semibold text-white text-center"
                  style={{ backgroundColor: 'var(--color-primary)' }}>
              Back to sign in
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}