import { onMounted, ref, reactive, watch } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'
import Drawer from './drawer'
import useMousePosition from './useMousePosition'
import useDraws from './useDraws'
import useSelfGun from './useSelfGun'
import useBullets from './useBullets'
import Item from '@/models/item'

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

export const TARGET_SPEED = 2

export default () => {
  const canvas = ref<any>(undefined)
  const canvasContext = ref<any>(undefined)
  const d = new Drawer()

  const state = reactive<CanvasState>({
    targetPosition: { y: 100, vy: TARGET_SPEED },
    mousePosition: { x: 600, y: 0 }
  })

  const { drawBackground, drawBases } = useDraws(d)
  const { drawGun, moveTargetVertically, drawTarget } = useSelfGun(d, state)
  const { shootBullet, drawBullets } = useBullets(d, state)

  const funs = reactive<{ drawMousePosition?: Function }>({ drawMousePosition: undefined })

  onMounted(() => {
    canvas.value = document.getElementById('shateki-canvas')
    canvasContext.value = canvas.value.getContext('2d')
    d.setContext(canvasContext.value)

    draw()
    setInterval(() => draw(), 10)

    const { drawMousePosition } = useMousePosition(d, canvas.value, state)
    funs.drawMousePosition = drawMousePosition
    canvas.value.addEventListener('click', (event: any) => shootBullet())
  })

  const draw = () => {
    d.setState(state)
    d.clearScreen()

    drawBackground()
    drawBases()

    drawItems(d)
    // drawBullets(d)

    if (appStores.rootStore.state.user) {
      drawGun()
      moveTargetVertically()
      drawTarget()
    }

    if (funs.drawMousePosition) funs.drawMousePosition()
  }

  const items = appStores.itemsStore.items
  watch(
    () => items.value,
    () => {
      if (!items.value) return
      items.value.forEach((item: Item) => {
        if (item.image) return
        const image = new Image()
        image.src = '/images/items/' + item.image_url!
        image.onload = () => {
          item.image = image
        }
      })
    }
  )
  const drawItems = (d: Drawer) => {
    if (!items.value) return
    items.value.forEach((item: any) => {
      if (item.image) d.drawImage(item.image, item.position, item.width, item.height)
    })
  }
}
