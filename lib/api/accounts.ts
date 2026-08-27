import { apiFetch } from './client'

// Organization accounts — actual Haelo platform logins under one company.
// Distinct from Staff Directory (lib/api/staff.ts), which tracks the people
// whose inboxes Haelo reads/drafts for, not who can log into Haelo itself.

export type AccountRole = 'owner' | 'admin' | 'member'
export type AccountStatus = 'active' | 'invited'

export interface OrgAccount {
  id: number
  name: string | null   // null until the invited person completes onboarding
  email: string
  role: AccountRole
  status: AccountStatus
  invitedAt?: string
  joinedAt?: string
}

export const getAccounts = async () => {
  return await apiFetch('/api/accounts', { method: 'GET' })
}

export const inviteAccount = async (payload: { email: string; role: AccountRole }) => {
  return await apiFetch('/api/accounts/invite', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const resendInvite = async (accountId: number) => {
  return await apiFetch(`/api/accounts/${accountId}/resend-invite`, { method: 'POST' })
}

export const removeAccount = async (accountId: number) => {
  return await apiFetch(`/api/accounts/${accountId}`, { method: 'DELETE' })
}

export const updateAccountRole = async (accountId: number, role: AccountRole) => {
  return await apiFetch(`/api/accounts/${accountId}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  })
}