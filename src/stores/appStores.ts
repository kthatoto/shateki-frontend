import { buildRootStore, RootStore } from '@/stores/rootStore'
import { buildItemsStore, ItemsStore } from '@/stores/itemsStore'

export interface AppStores {
  rootStore: RootStore
  itemsStore: ItemsStore

  clearStoreByName: (name: string) => void
}

const _: Partial<AppStores> = {}

export const appStores: AppStores = {
  get rootStore (): RootStore {
    return _.rootStore || (_.rootStore = buildRootStore())
  },
  get itemsStore (): ItemsStore {
    return _.itemsStore || (_.itemsStore = buildItemsStore())
  },

  clearStoreByName (name: string) {
    if (name === 'root') _.rootStore = undefined
  }
}
