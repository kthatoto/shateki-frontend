import { onMounted, ref, reactive, watch } from '@vue/composition-api'

import Drawer from './drawer'
import useMousePosition from './useMousePosition'
import useDraws from './useDraws'
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
}

export default (items: { value: Item[] }) => {
  const canvas = ref<any>(undefined)
  const canvasContext = ref<any>(undefined)
  const d = new Drawer()
  const targetSpeed = 2
  const state = reactive<CanvasState>({
    targetPosition: { y: 100, vy: targetSpeed }
  })
  let currentMousePosition = reactive<Vector>({ x: 600, y: 0 })
  const { drawBackground, drawBases } = useDraws(d)

  const funs = reactive<{
    drawMousePosition?: Function
  }>({
    drawMousePosition: undefined
  })

  onMounted(() => {
    canvas.value = document.getElementById('shateki-canvas')
    canvasContext.value = canvas.value.getContext('2d')
    d.setContext(canvasContext.value)

    draw()
    setInterval(() => draw(), 10)

    const { drawMousePosition, mousePosition } = useMousePosition(d, canvas.value)
    currentMousePosition = mousePosition
    funs.drawMousePosition = drawMousePosition
  })

  const draw = () => {
    d.setState(state)
    d.clearScreen()

    drawBackground()
    drawBases()
    drawItems(d)
    drawGuns(d)

    moveTargetVertically()
    drawTarget(d)
    if (funs.drawMousePosition) funs.drawMousePosition()
  }

  const gunImage = new Image()
  gunImage.src = require(`~/assets/gun.png`)
  const drawGuns = (d: Drawer) => {
    if (gunImage.complete) d.drawImage(gunImage, { x: currentMousePosition.x - 32, y: 420 }, 64, 191)
  }

  const moveTargetVertically = () => {
    const targetMinY = 0
    const targetMaxY = 350
    if (state.targetPosition.y <= targetMinY) {
      state.targetPosition.y = targetMinY
      state.targetPosition.vy = targetSpeed
    } else if (state.targetPosition.y >= targetMaxY) {
      state.targetPosition.y = targetMaxY
      state.targetPosition.vy = -targetSpeed
    }
    state.targetPosition.y += state.targetPosition.vy
  }
  const targetImage = new Image()
  targetImage.src = require(`~/assets/target.png`)
  const drawTarget = (d: Drawer) => {
    if (targetImage.complete) d.drawImage(targetImage, { x: currentMousePosition.x - 30, y: state.targetPosition.y }, 60, 60)
  }

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
