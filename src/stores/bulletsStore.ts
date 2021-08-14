import { ref } from '@vue/composition-api'

import Bullet from '@/models/bullet'

export const buildBulletsStore = () => {
  const bullets = ref<Bullet[]>([])

  Bullet.fetchList().then((bulletsResponse: Bullet[]) => bullets.value = bulletsResponse)

  return {
    bullets
  }
}

export type BulletsStore = ReturnType<typeof buildBulletsStore>
