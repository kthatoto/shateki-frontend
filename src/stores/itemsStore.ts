import { ref } from '@vue/composition-api'

import Item from '@/models/item'

export const buildItemsStore = () => {
  const items = ref<Item[]>([])

  Item.fetchList().then((itemsResponse: Item[]) => items.value = itemsResponse)

  return {
    items
  }
}

export type ItemsStore = ReturnType<typeof buildItemsStore>
