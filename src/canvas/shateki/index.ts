import { onMounted, ref, reactive } from '@vue/composition-api'

import Drawer from './drawer'
import useDrawMousePointerPosition from './drawMousePointerPosition'

export interface CanvasState {
  x: number
  y: number
}

export default () => {
  const canvas = ref<any>(undefined)
  const canvasContext = ref<any>(undefined)
  const d = new Drawer()
  const state = reactive<CanvasState>({
    x: 0,
    y: 0
  })

  const functions = reactive<{
    drawMousePointerPosition?: Function
  }>({
    drawMousePointerPosition: undefined
  })

  onMounted(() => {
    canvas.value = document.getElementById('shateki-canvas')
    canvasContext.value = canvas.value.getContext('2d')
    d.setContext(canvasContext.value)

    setInterval(() => draw(), 10)
    const { drawMousePointerPosition } = useDrawMousePointerPosition(d, canvas.value)
    functions.drawMousePointerPosition = drawMousePointerPosition
  })

  const draw = () => {
    d.setState(state)
    d.clearScreen()

    drawBases(d)
    drawItems(d)
    if (functions.drawMousePointerPosition) functions.drawMousePointerPosition()
  }

  const drawBases = (d: Drawer) => {
    d.ctx.fillStyle = '#8b0000'
    d.fillRect({ x: 50, y: 150 }, 1100, 30)
    d.fillRect({ x: 50, y: 350 }, 1100, 30)
  }

  const items = [
    { x: 70, y: 40,  }
  ]
  const drawItems = (d: Drawer) => {
  }
}
