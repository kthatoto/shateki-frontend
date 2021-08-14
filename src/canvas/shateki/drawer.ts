import { CanvasState } from './index'

interface Vector {
  x: number
  y: number
}

export default class Drawer {
  // constructor () {
  // }

  ctx: any
  setContext(ctx: any) {
    this.ctx = ctx
  }

  state?: CanvasState
  setState (state: CanvasState) {
    this.state = state
  }

  clearScreen () {
    this.ctx.fillStyle = '#eee'
    this.ctx.fillRect(0, 0, 3000, 3000)
  }

  fillRect (position: Vector, width: number, height: number) {
    this.ctx.fillRect(position.x, position.y, width, height)
  }

  fillText (text: string, position: Vector) {
    this.ctx.fillText(text, position.x, position.y)
  }

  drawImage (image: any, position: Vector, width?: number, height?: number) {
    this.ctx.drawImage(image, position.x, position.y, width, height)
  }
}
