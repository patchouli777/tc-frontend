import { reactive } from 'vue'

import { parseJWT } from './utils'

export type AuthState = {
  user: string | null
  isAuthenticated: boolean
  token: string | null
}

export const authState = reactive<AuthState>({
  user: null,
  isAuthenticated: false,
  token: null,
})

export const setToken = (token: string) => {
  authState.isAuthenticated = true
  authState.token = token
  const claims = parseJWT(authState.token!)
  authState.user = claims.username
  localStorage.setItem('loggedIn', 'true')
  localStorage.setItem('accessToken', token)
}

export const clearUser = () => {
  authState.user = null
  authState.isAuthenticated = false
  authState.token = null
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('accessToken')
  // deleteCookie('refreshToken')
}
