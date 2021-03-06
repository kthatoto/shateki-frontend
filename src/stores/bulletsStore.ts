import { ref } from '@vue/composition-api'

import Bullet from '@/models/bullet'

export const buildBulletsStore = () => {
  const bullets = ref<Bullet[]>([])

  const addBullet = (b: Bullet) => {
    bullets.value.push(b)
  }

  return {
    bullets,
    addBullet
  }
}

export type BulletsStore = ReturnType<typeof buildBulletsStore>
