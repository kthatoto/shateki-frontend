import { reactive } from '@vue/composition-api'

import Drawer from './drawer'
import { CanvasState } from './index'

export default (d: Drawer, canvas: any, state: CanvasState) => {
  canvas.addEventListener('mousemove', (event: any) => {
    const rect = canvas.getBoundingClientRect()
    state.mousePosition.x = event.clientX - rect.left
    state.mousePosition.y = event.clientY - rect.top
  })
}
