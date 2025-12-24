import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setToken } from '@/features/auth/store'
import { useAppAuthFetch } from '@/shared/lib/utils'
import './global.css'

const loggedIn = localStorage.getItem('loggedIn')

if (loggedIn) {
  const access = localStorage.getItem('accessToken')!
  setToken(access)
}

const includeCredentials: RequestCredentials = loggedIn ? 'include' : 'omit'

// if (loggedIn && includeCredentials === 'include') {
if (false) {
  const { onFetchResponse, data, onFetchError } = useAppAuthFetch(
    '/auth/v1/refresh',
    { credentials: includeCredentials },
    {},
  )
    .post({ username: 'user1', role: 'user' })
    .json()

  onFetchResponse((_) => {
    console.log(data)
    if (!data.value.token) return

    setToken(data.value.token)
  })

  onFetchError(() => {
    localStorage.removeItem('loggedIn')
  })
}

createApp(App).use(router).mount('#app')
