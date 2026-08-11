export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL //|| 'http://localhost:3010'

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`
  
  // Automatically attach auth token if available
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  }
  
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // Handle 401 Unauthorized globally
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login'
      }
    }
  }

  // Safely parse JSON response
  let data
  try {
    data = await response.json()
  } catch (err) {
    data = {}
  }

  // Handle API errors
  if (!response.ok || data.status === 'error') {
    throw new Error(data.message || 'An error occurred while processing the request')
  }

  return data
}
