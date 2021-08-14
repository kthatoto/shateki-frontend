import { onMounted, ref, reactive, watch } from '@vue/composition-api'

import Drawer from './drawer'
import useDrawMousePointerPosition from './drawMousePointerPosition'
import Item from '@/models/item'

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

  const funs = reactive<{
    drawMousePointerPosition?: Function
  }>({
    drawMousePointerPosition: undefined
  })

  onMounted(() => {
    canvas.value = document.getElementById('shateki-canvas')
    canvasContext.value = canvas.value.getContext('2d')
    d.setContext(canvasContext.value)

    draw()
    setInterval(() => draw(), 1000)

    const { drawMousePointerPosition } = useDrawMousePointerPosition(d, canvas.value)
    funs.drawMousePointerPosition = drawMousePointerPosition
  })

  const draw = () => {
    d.setState(state)
    d.clearScreen()

    drawBases(d)
    drawItems(d)
    if (funs.drawMousePointerPosition) funs.drawMousePointerPosition()
  }

  const drawBases = (d: Drawer) => {
    d.ctx.fillStyle = '#8b0000'
    d.fillRect({ x: 50, y: 150 }, 1100, 30)
    d.fillRect({ x: 50, y: 350 }, 1100, 30)
  }

  watch(
    () => items.value,
    () => {
      items.value.forEach((item: Item) => {
        if (item.image) return
        const image = new Image()
        image.src = item.image_url
        image.onload = () => {
          item.image = image
        }
      })
    }
  )
  const drawItems = (d: Drawer) => {
    console.log(items.value)
    items.value.forEach((item: any) => {
      if (item.image) d.ctx.drawImage(item.image, item.position.x, item.position.y, item.width, item.height)
    })
  }
}
