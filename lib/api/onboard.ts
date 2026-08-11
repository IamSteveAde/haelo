import { apiFetch } from './client'

export const connectEmail = async (provider: 'gmail.com' | 'zoho.com') => {
  return await apiFetch('/api/onboard/email', {
    method: 'POST',
    body: JSON.stringify({ provider })
  })
}

export const saveDomain = async (domain: string) => {
  return await apiFetch('/api/onboard/domain', {
    method: 'POST',
    body: JSON.stringify({ domain })
  })
}

export const addWhatsappNumber = async (phone: string) => {
  return await apiFetch('/api/onboard/whatsapp/add-number', {
    method: 'POST',
    body: JSON.stringify({ phone })
  })
}

export const verifyWhatsappNumber = async (phone: string, otp: string) => {
  return await apiFetch('/api/onboard/whatsapp/verify-number', {
    method: 'POST',
    body: JSON.stringify({ phone, otp })
  })
}

export const uploadBibleFiles = async (formData: FormData) => {
  return await apiFetch('/api/bible/upload', {
    method: 'POST',
    body: formData
  })
}

export const saveHaeloTone = async (tone: string) => {
  return await apiFetch('/api/onboard/haelo-tone', {
    method: 'POST',
    body: JSON.stringify({ tone })
  })
}

export const saveTimerConfig = async (payload: { timer: string, timerConfig: { sendAfter: number, remindAfter: number } }) => {
  return await apiFetch('/api/onboard/haelo-tone', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
