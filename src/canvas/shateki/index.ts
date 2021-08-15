import { onMounted, ref, reactive, watch } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'
import Drawer from './drawer'
import useMousePosition from './useMousePosition'
import useDraws from './useDraws'
import useSelfGun from './useSelfGun'
import useBullets from './useBullets'
import Item from '@/models/item'

import useOtherGuns from './useOtherGuns'
import useOtherBullets from './useOtherBullets'

interface Vector {
  x: number
  y: number
}
export interface CanvasState {
  targetPosition: {
    y: number
    vy: number
  }
  mousePosition: Vector
}

export const TARGET_SPEED = 4

export default () => {
  const canvas = ref<any>(undefined)
  const canvasContext = ref<any>(undefined)
  const d = new Drawer()

  const state = reactive<CanvasState>({
    targetPosition: { y: 100, vy: TARGET_SPEED },
    mousePosition: { x: 600, y: 0 }
  })

  onMounted(() => {
    canvas.value = document.getElementById('shateki-canvas')
    canvasContext.value = canvas.value.getContext('2d')
    d.setContext(canvasContext.value)

    draw()
    setInterval(() => draw(), 20)

    useMousePosition(d, canvas.value, state)
    canvas.value.addEventListener('click', (event: any) => shootBullet())
  })

  const { drawBackground, drawBases } = useDraws(d)
  const { drawGun, moveTargetVertically, drawTarget } = useSelfGun(d, state)
  const { shootBullet, drawBullets } = useBullets(d, state)

  setTimeout(() => {
    useOtherGuns(d)
    useOtherBullets(d)
  }, 3000)

  const draw = () => {
    d.setState(state)
    d.clearScreen()

    drawBackground()
    drawBases()

    drawItems(d)
    drawBullets()

    if (appStores.rootStore.state.user) {
      drawGun()
      moveTargetVertically()
      drawTarget()
    }
  }

  const itemsStore = appStores.itemsStore
  const drawItems = (d: Drawer) => {
    const items: Item[] = itemsStore.displayingItems.value
    if (!items) return
    items.forEach((item: Item) => {
      if (item.image) {
        d.drawImage(item.image, item.position, item.width, item.height)

        const hpBarHeight = 20
        d.ctx.fillStyle = 'black'
        d.fillRect({ x: item.position.x, y: item.position.y + item.height }, item.width, hpBarHeight)
        d.ctx.fillStyle = item.barColor
        d.fillRect({ x: item.position.x + 1, y: item.position.y + item.height + 1 }, item.barWidth, hpBarHeight - 2)
      }
    })
  }
}
