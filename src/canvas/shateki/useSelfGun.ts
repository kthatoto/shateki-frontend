import Drawer from './drawer'
import { CanvasState, TARGET_SPEED } from './index'

export default (d: Drawer, state: CanvasState) => {
  const gunImage = new Image()
  gunImage.src = require(`~/assets/gun.png`)
  const drawGun = () => {
    if (gunImage.complete) d.drawImage(gunImage, { x: state.mousePosition.x - 32, y: 420 }, 64, 191)
  }

  const moveTargetVertically = () => {
    const targetMinY = 0
    const targetMaxY = 350
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
    if (targetImage.complete) d.drawImage(targetImage, { x: state.mousePosition.x - 30, y: state.targetPosition.y }, 60, 60)
  }

  return {
    drawGun,
    moveTargetVertically,
    drawTarget
  }
}
