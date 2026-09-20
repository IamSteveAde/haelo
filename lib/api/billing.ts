import { apiFetch } from './client'

export const getBillingHistory = async (page: number = 1, limit: number = 5) => {
  return await apiFetch(`/api/billing/history?page=${page}&limit=${limit}`, {
    method: 'GET'
  })
}
