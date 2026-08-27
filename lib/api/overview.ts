import { apiFetch } from './client'

export type OverviewMetricType = 'emails-handled' | 'avg-response-time' | 'approval-rate' | 'staff-recognised'

export const getOverviewMetric = async (metric: OverviewMetricType) => {
  return await apiFetch(`/api/overview/metrics?metric=${metric}`, {
    method: 'GET'
  })
}
