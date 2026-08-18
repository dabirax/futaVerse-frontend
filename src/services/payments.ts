import { mockBanks } from '@/data/mockBanks'
import { fetchWithAuth } from '@/lib/api'

export interface Bank {
  name: string
  code: string
}

export interface ResolveAccountInput {
  account_number: string
  bank_code: string
  bank_name: string
}

const getBaseUrl = () => import.meta.env.VITE_API_URL || ''

const extractErrorMessage = (data: unknown, fallback: string): string => {
  if (!data || typeof data !== 'object') return fallback
  const obj = data as Record<string, unknown>
  if (typeof obj.detail === 'string') return obj.detail
  if (typeof obj.message === 'string') return obj.message
  if (typeof obj.error === 'string') return obj.error
  if (Array.isArray(obj.detail)) return obj.detail.join('\n')
  return fallback
}

export const PaymentsService = {
  listBanks: async (): Promise<Array<Bank>> => {
    const baseUrl = getBaseUrl()
    if (!baseUrl) return mockBanks

    const response = await fetchWithAuth(`${baseUrl}/api/payments/banks`, {
      method: 'GET',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(extractErrorMessage(errorData, 'Failed to fetch banks'))
    }
    return response.json()
  },

  resolveAccount: async (
    input: ResolveAccountInput,
  ): Promise<{ account_name: string }> => {
    const baseUrl = getBaseUrl()
    if (!baseUrl) {
      await new Promise((r) => setTimeout(r, 400))
      return { account_name: `MOCK ${input.account_number}` }
    }

    const response = await fetchWithAuth(`${baseUrl}/api/payments/resolve`, {
      method: 'POST',
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        extractErrorMessage(errorData, 'Could not resolve account'),
      )
    }
    return response.json()
  },

  linkAccount: async (
    input: ResolveAccountInput,
  ): Promise<{ message?: string }> => {
    const baseUrl = getBaseUrl()
    if (!baseUrl) {
      await new Promise((r) => setTimeout(r, 400))
      return { message: 'ok' }
    }

    const response = await fetchWithAuth(
      `${baseUrl}/api/payments/link-account`,
      {
        method: 'POST',
        body: JSON.stringify(input),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(extractErrorMessage(errorData, 'Failed to link account'))
    }
    return response.json()
  },
}
