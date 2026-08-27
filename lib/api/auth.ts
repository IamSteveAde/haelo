import { apiFetch } from './client'

export const login = async (email: string, password: string) => {
  return await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

export const register = async (payload: { name: string, email: string, companyName: string, password: string }) => {
  return await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const checkEmail = async (email: string) => {
  return await apiFetch('/api/auth/check-email', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

export const verifyOtp = async (token: string, otp: string) => {
  return await apiFetch('/api/auth/verify', {
    method: 'POST',
    body: JSON.stringify({ token, otp })
  })
}
