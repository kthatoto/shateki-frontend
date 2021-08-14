interface Vector {
  x: number
  y: number
}

export default class Bullet {
  static async fetchList (): Promise<Bullet[]> {
    return []
  }

  constructor (position: Vector, goal: Vector, vy: number, uid: string) {
    this.position = position
    this.goal = goal
    this.vy = vy
    this.uid = uid
  }

  position: Vector
  goal: Vector
  vy: number
  uid: string
}
