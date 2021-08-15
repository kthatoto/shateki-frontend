import { ref } from '@vue/composition-api'

import Drawer from './drawer'
import { appStores } from '@/stores/appStores'

export default (d: Drawer) => {
  const gunImage = new Image()
  gunImage.src = require(`~/assets/gun.png`)

  const database = appStores.rootStore.database.value
  const gunsRef = database.ref('guns')

  const guns = ref<{ x: number }[]>([])

  gunsRef.on('value', (snapshot: any) => {
    const newGuns: { x: number }[] = []
    const data: any = snapshot.val()
    if (!data) return
    Object.keys(data).forEach((uidKey: string) => {
      if (uidKey === appStores.rootStore.uid.value) return
      const target: any = data[uidKey]
      newGuns.push(target)
    })
    guns.value = newGuns
  })

  const drawOtherGuns = () => {
    guns.value.forEach((g: { x: number }) => {
      d.drawImage(gunImage, { x: g.x, y: 420 }, 64, 191)
    })
  }

  return drawOtherGuns
}
