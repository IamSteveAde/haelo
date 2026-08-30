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
  const res = await apiFetch('/api/staff/invite', { method: 'GET' })
  if (res && res.data) {
    res.data = res.data.map((inv: any) => ({
      id: inv.id,
      name: null,
      email: inv.email,
      role: inv.userType,
      status: inv.isUsed ? 'active' : 'invited',
      invitedAt: inv.createdAt,
      joinedAt: inv.updatedAt
    }))
  }
  return res
}

export const inviteAccount = async (payload: { email: string; role: AccountRole }) => {
  return await apiFetch('/api/staff/invite', {
    method: 'POST',
    body: JSON.stringify({ email: payload.email, userType: payload.role }),
  })
}

export const resendInvite = async (email: string) => {
  return await apiFetch(`/api/staff/invite/resend`, { 
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

export const removeAccount = async (email: string) => {
  return await apiFetch(`/api/staff/invite/revoke`, { 
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

export const updateAccountRole = async (email: string, role: AccountRole) => {
  return await apiFetch(`/api/accounts/role`, {
    method: 'PATCH',
    body: JSON.stringify({ email, role }),
  })
}