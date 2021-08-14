import { ref } from '@vue/composition-api'

import Item from '@/models/item'

interface Vector { x: number; y: number }

export const buildItemsStore = () => {
  const items = ref<Item[]>([])

  const checkHit = (position: Vector) => {
    // items.value.filter()
  }

  return {
    items,
    checkHit
  }
}

export type ItemsStore = ReturnType<typeof buildItemsStore>
