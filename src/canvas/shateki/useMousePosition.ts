import { reactive } from '@vue/composition-api'

import Drawer from './drawer'
import { CanvasState } from './index'

export default (d: Drawer, canvas: any, state: CanvasState) => {
  canvas.addEventListener('mousemove', (event: any) => {
    const rect = canvas.getBoundingClientRect()
    state.mousePosition.x = event.clientX - rect.left
    state.mousePosition.y = event.clientY - rect.top
  })

  const drawMousePosition = () => {
    d.ctx.fillStyle = 'black'
    d.ctx.font = '24px san-serif'
    d.fillText(`x:${state.mousePosition.x}`, { x: 1100, y: 30 })
    d.fillText(`y:${state.mousePosition.y}`, { x: 1100, y: 50 })
  }

  return { drawMousePosition }
}
