import { apiFetch } from './client'

export const getActivityMetrics = async () => {
  return await apiFetch('/api/activity-logs/metrics', {
    method: 'GET'
  })
}

export const getActivityLogs = async (page: number = 1, limit?: number) => {
  const url = limit ? `/api/activity-logs/list?page=${page}&limit=${limit}` : `/api/activity-logs/list?page=${page}`
  return await apiFetch(url, {
    method: 'GET'
  })
}
