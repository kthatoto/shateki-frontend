import { reactive } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'
import { HitStatus } from '@/stores/itemsStore'
import Drawer from './drawer'
import CreateSound from './createSound'
import { CanvasState } from './index'
import Bullet from '@/models/bullet'
import Item from '@/models/item'

import gunHitSound from '@/assets/musics/gun_hit1.mp3'
import gunOutSound from '@/assets/musics/gun_out2.mp3'
import gunShootSound from '@/assets/musics/gun_shoot2.mp3'
import gunReloadSound from '@/assets/musics/gun_reload.mp3'

const RELOAD_TIME = 3000
const BULLET_SPEED = 8
const randomDamage = (name: string) => {
  const damage = Math.round(7 + Math.random() * (Math.random() * 15))
  console.log(`「${name}」に${damage}ダメージを与えた！`)
  return damage
}

export default (d: Drawer, state: CanvasState) => {
  const bulletsStore = appStores.bulletsStore
  const itemsStore = appStores.itemsStore

  const bulletState = reactive<{
    reloaded: boolean
  }>({
    reloaded: true
  })

  const shootBullet = () => {
    if (!bulletState.reloaded) return

    CreateSound(gunShootSound)
    const mouseX = state.mousePosition.x
    const uid = appStores.rootStore.state.user!.uid
    const newBullet = new Bullet({ x: mouseX, y: 400 }, { x: mouseX, y: state.targetPosition.y }, -BULLET_SPEED, uid!)
    bulletsStore.addBullet(newBullet)

    bulletState.reloaded = false

    setTimeout(() => CreateSound(gunReloadSound), RELOAD_TIME - 2000)
    setTimeout(() => bulletState.reloaded = true, RELOAD_TIME)
  }

  const bulletImage = new Image()
  bulletImage.src = require('~/assets/bullet.png')
  const drawBullets = () => {
    if (!bulletImage.complete) return
    const newBullets = bulletsStore.bullets.value.map((b: Bullet) => {
      if (b.goaled) return

      b.position.y += b.vy
      if (b.position.y <= b.goal.y) {
        b.position.y = b.goal.y
        b.goaled = true

        const hitStatus: HitStatus = itemsStore.checkHit(b.goal)
        if (hitStatus.hit) {
          const hitItem: Item = hitStatus.item!
          hitItem.hp -= randomDamage(hitItem.name)
          if (hitItem.hp <= 0) {
            itemsStore.defeatItem(hitItem)
          } else {
            CreateSound(gunHitSound)
          }
        } else {
          CreateSound(gunOutSound)
        }
      }
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
