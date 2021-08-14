import { onMounted, ref, reactive, watch } from '@vue/composition-api'

import Drawer from './drawer'
import useMousePosition from './useMousePosition'
import Item from '@/models/item'

interface Vector {
  x: number
  y: number
}
export interface CanvasState {
  x: number
  y: number
}

export default (items: { value: Item[] }) => {
  const canvas = ref<any>(undefined)
  const canvasContext = ref<any>(undefined)
  const d = new Drawer()
  const state = reactive<CanvasState>({
    x: 0,
    y: 0
  })
  let currentMousePosition = reactive<Vector>({ x: 0, y: 0 })

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

    drawBases(d)
    drawItems(d)
    drawGuns(d)
    if (funs.drawMousePosition) funs.drawMousePosition()
  }

  const drawBases = (d: Drawer) => {
    d.ctx.fillStyle = '#8b0000'
    d.fillRect({ x: 50, y: 150 }, 1100, 30)
    d.fillRect({ x: 50, y: 350 }, 1100, 30)
  }

  const gunImage = new Image()
  gunImage.src = require(`~/assets/gun.png`)
  gunImage.onload = () => {}
  const drawGuns = (d: Drawer) => {
    if (gunImage.complete) d.drawImage(gunImage, { x: currentMousePosition.x - 32, y: 420 }, 64, 191)
  }

  watch(
    () => items.value,
    () => {
      items.value.forEach((item: Item) => {
        if (item.image) return
        const image = new Image()
        image.src = item.image_url!
        image.onload = () => {
          item.image = image
        }
      })
    }
  )
  const drawItems = (d: Drawer) => {
    items.value.forEach((item: any) => {
      if (item.image) d.drawImage(item.image, item.position, item.width, item.height)
    })
  }
}
