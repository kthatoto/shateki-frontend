import { ref } from '@vue/composition-api'

import Drawer from './drawer'
import { CanvasState, TARGET_SPEED } from './index'
import firebase from '@/plugins/firebase'

import { appStores } from '@/stores/appStores'

export default (d: Drawer, state: CanvasState) => {
  const uid = appStores.rootStore.uid

  const database = appStores.rootStore.database
  const maxCallingFlag = 5
  let callingFlag = 0 // 0の時data set

  const gunRef = ref<any>(undefined)
  const gunImage = new Image()
  gunImage.src = require(`~/assets/gun.png`)
  const drawGun = () => {
    if (!gunImage.complete) return
    const x = state.mousePosition.x - 32
    d.drawImage(gunImage, { x, y: 420 }, 64, 191)
    if (!uid.value) return
    if (!database.value) return
    if (!gunRef.value) {
      gunRef.value = database.value.ref(`guns/${uid.value}`)
    }

    if (callingFlag <= 0) {
      gunRef.value.set({
        uid: uid.value,
        x,
        timestamp: database.value.app.firebase_.database.ServerValue.TIMESTAMP
      })
      callingFlag = maxCallingFlag
    } else {
      callingFlag--
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
