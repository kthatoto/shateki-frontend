import { ref } from '@vue/composition-api'

import Drawer from './drawer'
import { appStores } from '@/stores/appStores'

interface Vector { x: number; y: number }

export default (d: Drawer) => {
  const bulletImage = new Image()
  bulletImage.src = require('~/assets/bullet.png')

  const database = appStores.rootStore.database.value
  const bulletsRef = database.ref('bullets')

  const bullets = ref<Vector[]>([])

  bulletsRef.on('value', (snapshot: any) => {
    const newBullets: Vector[] = []
    const data: any = snapshot.val()
    if (!data) return
    Object.keys(data).forEach((uidKey: string) => {
      if (uidKey === appStores.rootStore.uid.value) return
      const target: any = data[uidKey]
      newBullets.push(target)
    })
    bullets.value = newBullets
  })

  const drawOtherBullets = () => {
    bullets.value.forEach((b: Vector) => {
      d.drawImage(bulletImage, { x: b.x - 7, y: b.y }, 14, 28)
    })
  }

  return drawOtherBullets
}
