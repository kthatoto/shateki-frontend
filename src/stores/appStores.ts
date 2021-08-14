import { buildRootStore, RootStore } from '@/stores/rootStore'

export interface AppStores {
  rootStore: RootStore

  clearStoreByName: (name: string) => void
}

const _: Partial<AppStores> = {}

export const appStores: AppStores = {
  get rootStore (): RootStore {
    return _.rootStore || (_.rootStore = buildRootStore())
  },

  clearStoreByName (name: string) {
    if (name === 'root') _.rootStore = undefined
  }
}
