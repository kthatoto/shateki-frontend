import { ref } from '@vue/composition-api'

import Item from '@/models/item'

interface Vector { x: number; y: number }
export interface HitStatus {
  hit: boolean
  item?: Item
}

export const buildItemsStore = () => {
  const items = ref<Item[]>([])

  const checkHit = (position: Vector): HitStatus => {
    const hitItem: Item | undefined = items.value.filter((item: Item) => item.alive).find((item: Item) => {
      return item.position.x < position.x && position.x < item.position.x + item.width &&
             item.position.y < position.y && position.y < item.position.y + item.height
    })
    return { hit: !!hitItem, item: hitItem }
  }

  const defeatItem = (item: Item) => {
    items.value = items.value.map((i: Item) => {
      if (i.name !== item.name) return i
      i.alive = false
      return i
    })
  }

  return {
    items,
    checkHit,
    defeatItem
  }
}

export type ItemsStore = ReturnType<typeof buildItemsStore>
