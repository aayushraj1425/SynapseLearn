const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const TOKEN_KEY = 'synapse_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => localStorage.removeItem(TOKEN_KEY)

async function request(path, options = {}) {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail || `Request failed (${response.status})`)
  }

  return response.json()
}

export async function signup(email, password) {
  return request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username: email, password }),
  })
  setToken(data.access_token)
  return data
}

export async function logout() {
  await request('/auth/logout', { method: 'POST' }).catch(() => {})
  clearToken()
}

export function getMe() {
  return request('/auth/me')
}
