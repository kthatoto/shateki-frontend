import { ref } from '@vue/composition-api'

import Drawer from './drawer'
import { CanvasState, TARGET_SPEED } from './index'

import { appStores } from '@/stores/appStores'

export default (d: Drawer, state: CanvasState) => {
  const uid = appStores.rootStore.uid

  const gunRef = ref<any>(undefined)
  const gunImage = new Image()
  gunImage.src = require(`~/assets/gun.png`)
  const drawGun = () => {
    if (gunImage.complete) {
      const x = state.mousePosition.x - 32
      d.drawImage(gunImage, { x, y: 420 }, 64, 191)
      if (!uid.value) return
      if (!gunRef.value) {
        const database = appStores.rootStore.database.value
        gunRef.value = database.ref(`guns/${uid.value}`)
      }
      gunRef.set({ uid: uid.value, x })
    }
  }

  const moveTargetVertically = () => {
    const targetMinY = 0
    const targetMaxY = 370
    if (state.targetPosition.y <= targetMinY) {
      state.targetPosition.y = targetMinY
      state.targetPosition.vy = TARGET_SPEED
    } else if (state.targetPosition.y >= targetMaxY) {
      state.targetPosition.y = targetMaxY
      state.targetPosition.vy = -TARGET_SPEED
    }
    state.targetPosition.y += state.targetPosition.vy
  }
  const targetImage = new Image()
  targetImage.src = require(`~/assets/target.png`)
  const drawTarget = () => {
    if (targetImage.complete) d.drawImage(targetImage, { x: state.mousePosition.x - 30, y: state.targetPosition.y - 30 }, 60, 60)
  }

  return {
    drawGun,
    moveTargetVertically,
    drawTarget
  }
}
