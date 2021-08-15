import { ref } from '@vue/composition-api'

import Drawer from './drawer'
import { appStores } from '@/stores/appStores'

export default (d: Drawer) => {
  const gunImage = new Image()
  gunImage.src = require(`~/assets/gun.png`)

  const database = appStores.rootStore.database.value
  const gunsRef = database.ref('guns')

  gunsRef.on('value', (snapshot: any) => {
    const data: any = snapshot.val()
    if (!data) return
    Object.keys(data).forEach((uidKey: string) => {
      if (uidKey === appStores.rootStore.uid.value) return
      d.drawImage(gunImage, { x: data[uidKey].x, y: 420 }, 64, 191)
    })
  })
}
