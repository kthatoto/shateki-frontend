import { ref } from '@vue/composition-api'

import Drawer from './drawer'
import { appStores } from '@/stores/appStores'

export default (d: Drawer) => {
  const bulletImage = new Image()
  bulletImage.src = require('~/assets/bullet.png')

  const database = appStores.rootStore.database.value
  const bulletsRef = database.ref('bullets')

  bulletsRef.on('value', (snapshot: any) => {
    const data: any = snapshot.val()
    if (!data) return
    Object.keys(data).forEach((uidKey: string) => {
      if (uidKey === appStores.rootStore.uid.value) return
      d.drawImage(bulletImage, { x: data[uidKey].x - 7, y: data[uidKey].y }, 14, 28)
    })
  })
}
