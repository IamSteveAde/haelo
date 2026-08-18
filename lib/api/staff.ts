import { apiFetch } from './client'

export const getUnrecognizedSenders = async (page: number = 1, limit: number = 7) => {
  return await apiFetch(`/api/staff/unrecognized-senders?page=${page}&limit=${limit}`, {
    method: 'GET'
  })
}

export const addStaff = async (payload: { fullName: string, role: string, email: string, department: string }) => {
  return await apiFetch('/api/staff/add', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const getStaffDirectory = async (page: number = 1) => {
  return await apiFetch(`/api/staff/directory?page=${page}`, {
    method: 'GET'
  })
}
