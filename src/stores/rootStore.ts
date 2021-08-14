import { reactive, computed, ref } from '@vue/composition-api'

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
  const uid = computed<string | undefined>(() => state.user?.uid)

  const database = ref<any>(undefined)
  const setDatabase = (db: any) => database.value = db

  return {
    state,
    setUser,
    clearUser,
    uid,

    database,
    setDatabase
  }
}

export type RootStore = ReturnType<typeof buildRootStore>
