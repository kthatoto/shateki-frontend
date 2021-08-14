import { reactive } from '@vue/composition-api'

import Drawer from './drawer'

export default (d: Drawer, canvas: any) => {
  const position = reactive({ x: 0, y: 0 })
  canvas.addEventListener('mousemove', (event: any) => {
    const rect = canvas.getBoundingClientRect()
    position.x = event.clientX - rect.left
    position.y = event.clientY - rect.top
  })

  const drawMousePosition = () => {
    d.ctx.fillStyle = 'black'
    d.ctx.font = '24px san-serif'
    d.fillText(`x:${position.x}`, { x: 1100, y: 30 })
    d.fillText(`y:${position.y}`, { x: 1100, y: 50 })
  }

  return {
    mousePosition: position,
    drawMousePosition
  }
}
