import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createFetch } from '@vueuse/core'

import { authState } from '@/features/auth/store'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeDiffFromNow(unixTimestamp: number) {
  const now = Date.now()
  const diffMillis = Math.abs(now - unixTimestamp * 1000)

  const hours = Math.floor(diffMillis / (1000 * 60 * 60))
  const minutes = Math.floor((diffMillis % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diffMillis % (1000 * 60)) / 1000)

  const pad = (num: number) => num.toString().padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export const useAppFetch = createFetch({
  baseUrl: 'http://localhost:8090/api/',
  options: {
    beforeFetch({ options }) {
      const myToken = authState.token
      if (myToken) {
        // @ts-ignore
        options.headers.Authorization = `Bearer ${myToken}`
      }

      return { options }
    },
    onFetchError(ctx) {
      console.log('context:', ctx)
      console.log('data:', ctx.data)
      return ctx
    },
  },
  fetchOptions: {
    credentials: 'include',
    mode: 'cors',
  },
})

export const useAppAuthFetch = createFetch({
  baseUrl: 'http://localhost:8095/',
  options: {
    beforeFetch({ options }) {
      const myToken = authState.token
      if (myToken) {
        // @ts-ignore
        options.headers.Authorization = `Bearer ${myToken}`
      }

      return { options }
    },
    onFetchError(ctx) {
      console.log('context:', ctx)
      console.log('data:', ctx.data)
      return ctx
    },
  },
  fetchOptions: {
    credentials: 'include',
    mode: 'cors',
  },
})

type Options = {
  expires?: Date | string
  path?: string
  'max-age'?: number
  [key: string]: any
}

export function setCookie(name: string, value: string, options: Options = {}) {
  options = {
    path: '/',
    ...options,
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey
    let optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue
    }
  }

  document.cookie = updatedCookie
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  })
}
