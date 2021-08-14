import { ref, computed } from '@vue/composition-api'

import Item from '@/models/item'
import CreateSound from '@/canvas/shateki/createSound'
import itemDropDefaultSound from '@/assets/musics/item_drop_default.mp3'
import itemDropGreatSound from '@/assets/musics/item_drop_great.mp3'
import itemDropMoneySound from '@/assets/musics/item_drop_money.mp3'

interface Vector { x: number; y: number }
export interface HitStatus {
  hit: boolean
  item?: Item
}

export const buildItemsStore = () => {
  const items = ref<Item[]>([])
  const displayingItems = computed<Item[]>(() => items.value.filter((item: Item) => item.alive))

  const checkHit = (position: Vector): HitStatus => {
    const hitItem: Item | undefined = items.value.filter((item: Item) => item.alive).find((item: Item) => {
      return item.position.x < position.x && position.x < item.position.x + item.width &&
             item.position.y < position.y && position.y < item.position.y + item.height
    })
    return { hit: !!hitItem, item: hitItem }
  }

  const defeatItem = (item: Item) => {
    switch(item.name) {
      case 'ATM':
      case 'クレジットカード':
      case '麻袋':
        CreateSound(itemDropMoneySound)
        break
      case 'だるま':
        CreateSound(itemDropGreatSound)
        break
      default:
        CreateSound(itemDropDefaultSound)

    }
    items.value = items.value.map((i: Item) => {
      if (i.name !== item.name) return i
      i.alive = false
      return i
    })
  }

  return {
    items,
    displayingItems,
    checkHit,
    defeatItem
  }
}

export type ItemsStore = ReturnType<typeof buildItemsStore>
