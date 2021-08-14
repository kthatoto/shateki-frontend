interface Vector {
  x: number
  y: number
}

export default class Bullet {
  constructor (position: Vector, goal: Vector, vy: number, uid: string) {
    this.position = position
    this.goal = goal
    this.vy = vy
    this.uid = uid
    this.goaled = false
  }

  position: Vector
  goal: Vector
  vy: number
  uid: string
  goaled: boolean
}
