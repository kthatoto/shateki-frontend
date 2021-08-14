import { reactive } from '@vue/composition-api'

export interface User {
  uid?: string
  email?: string
  emailVerified: boolean
  jwt?: string

  bullets: number
}

export const buildRootStore = () => {
  const state = reactive<{
    user?: User
  }>({
    user: undefined
  })

  const setUser = (user: User) => {
    state.user = user
    if (user.jwt) localStorage.jwt = user.jwt
  }

  const clearUser = () => {
    state.user = undefined
    localStorage.removeItem('jwt')
  }

  return {
    state,
    setUser,
    clearUser
  }
}

export type RootStore = ReturnType<typeof buildRootStore>
