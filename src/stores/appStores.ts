import { buildRootStore, RootStore } from '@/stores/rootStore'
import { buildItemsStore, ItemsStore } from '@/stores/itemsStore'
import { buildBulletsStore, BulletsStore } from '@/stores/bulletsStore'

export interface AppStores {
  rootStore: RootStore
  itemsStore: ItemsStore
  bulletsStore: BulletsStore

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
  get bulletsStore (): BulletsStore {
    return _.bulletsStore || (_.bulletsStore = buildBulletsStore())
  },

  clearStoreByName (name: string) {
    if (name === 'root') _.rootStore = undefined
  }
}
