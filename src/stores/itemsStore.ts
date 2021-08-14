import { ref } from '@vue/composition-api'

import Item from '@/models/item'

export const buildItemsStore = () => {
  const items = ref<Item[]>([])

  const shatekiId = 5
  Item.fetchList(shatekiId).then((itemsResponse: Item[]) => items.value = itemsResponse)

  return {
    items
  }
}

export type ItemsStore = ReturnType<typeof buildItemsStore>
