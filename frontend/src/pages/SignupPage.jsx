import { useState } from 'react'
import { login, signup } from '../auth.js'

export default function SignupPage({ onAuthenticated, onGoToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(email, password)
      await login(email, password)
      onAuthenticated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '0 16px' }}>
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: 8 }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 8 }}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        Already have an account?{' '}
        <button onClick={onGoToLogin} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue' }}>
          Sign in
        </button>
      </p>
    </div>
  )
}
