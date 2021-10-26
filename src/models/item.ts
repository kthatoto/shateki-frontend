import axios, { AxiosResponse } from 'axios'

interface Vector { x: number; y: number }
interface ItemsResponse {
  items: Item[]
}

const mockData = [
  { height: 160, name: "ATM", position: { x: 280, y: 220 }, score: 40, weight: 100, width: 140, image_url: 'atm.png' },
  { height: 60, name: "お茶", position: { x: 700, y: 100 }, score: 5, weight: 20, width: 25, image_url: 'tea.png' },
  { height: 60, name: "かき氷", position: { x: 870, y: 320 }, score: 20, weight: 100, width: 40, image_url: 'kakigori-red.png' },
  { height: 185, name: "だるま", position: { x: 500, y: 195 }, score: 800, weight: 1000, width: 190, image_url: 'daruma.png' },
  { height: 90, name: "だるま（トラ）", position: { x: 900, y: 70 }, score: 20, weight: 40, width: 80, image_url: 'tora-daruma.png' },
  { height: 130, name: "イースターエッグ", position: { x: 170, y: 30 }, score: 20, weight: 100, width: 130, image_url: 'eggs.png' },
  { height: 30, name: "クレジットカード", position: { x: 980, y: 350 }, score: 200, weight: 100, width: 50, image_url: 'credit-card.png' },
  { height: 90, name: "スイカペンギン", position: { x: 70, y: 290 }, score: 10, weight: 100, width: 80, image_url: 'pengin.png' },
  { height: 160, name: "扇風機", position: { x: 750, y: 220 }, score: 10, weight: 80, width: 100, image_url: 'fan.png' },
  { height: 90, name: "言わザル", position: { x: 420, y: 70 }, score: 20, weight: 40, width: 70, image_url: 'saru-iwazaru.png' },
  { height: 100, name: "麻袋", position: { x: 560, y: 60 }, score: 150, weight: 700, width: 80, image_url: 'money.png' }
]

export default class Item {
  static async fetchList (): Promise<Item[]> {
    // const endpoint = `https://aluminum-318311.uw.r.appspot.com/api/stores/10`
    // const res: any = await axios.get(endpoint)
    // return res.data.store.items.map((i: any) => {
    return mockData.map((i: any) => {
      return new this(i.name, i.position, i.score, i.weight, i.width, i.height, i.image_url)
    })
  }

  constructor (name: string, position: Vector, score: number, weight: number, width: number, height: number, imageUrl: string) {
    this.name = name
    this.position = position
    this.score = score
    this.weight = weight
    this.width = width
    this.height = height
    this.imageUrl = imageUrl

    this.alive = true
    this.hp = weight
    this.revivalCount = 0

    const newImage = new Image()
    newImage.src = '/images/items/' + imageUrl
    newImage.onload = () => {
      this.image = newImage
    }
  }

  get barColor (): 'green' | 'yellow' | 'red' {
    if (this.hp <= this.weight * 0.2) return 'red'
    if (this.hp <= this.weight * 0.4) return 'yellow'
    return 'green'
  }

  get barWidth (): number {
    return this.width * (this.hp / this.weight) - 2
  }

  name: string
  position: Vector
  score: number
  weight: number // maxHP
  width: number
  height: number
  imageUrl: string

  image?: any
  alive: boolean
  hp: number

  revivalCount: number
}
