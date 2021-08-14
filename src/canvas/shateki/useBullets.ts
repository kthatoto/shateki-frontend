import { reactive } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'
import Drawer from './drawer'
import { CanvasState } from './index'
import Bullet from '@/models/bullet'

const RELOAD_TIME = 3000
const BULLET_SPEED = 4

export default (d: Drawer, state: CanvasState) => {
  const bulletsStore = appStores.bulletsStore

  const bulletState = reactive<{
    reloaded: boolean
  }>({
    reloaded: true
  })

  const shootBullet = () => {
    if (!bulletState.reloaded) return

    const mouseX = state.mousePosition.x
    const uid = appStores.rootStore.state.user!.uid
    const newBullet = new Bullet({ x: mouseX, y: 400 }, { x: mouseX, y: state.targetPosition.y }, -BULLET_SPEED, uid!)
    bulletsStore.addBullet(newBullet)

    bulletState.reloaded = false
    setTimeout(() => bulletState.reloaded = true, RELOAD_TIME)
  }

  const bulletImage = new Image()
  bulletImage.src = require('~/assets/bullet.png')
  const drawBullets = () => {
    if (!bulletImage.complete) return
    const newBullets = bulletsStore.bullets.value.map((b: Bullet) => {
      b.position.y += b.vy
      if (b.position.y <= b.goal.y) return
      d.drawImage(bulletImage, { x: b.position.x - 7, y: b.position.y }, 14, 28)
      return b
    }).filter((b: Bullet | undefined) => b)
    bulletsStore.bullets.value = newBullets as Bullet[]
  }

  return {
    shootBullet,
    drawBullets
  }
}
