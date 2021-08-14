import axios, { AxiosResponse } from 'axios'

interface Vector { x: number; y: number }
interface ItemsResponse {
  items: Item[]
}

export default class Item {
  static async fetchList (): Promise<Item[]> {
    const endpoint = `https://aluminum-318311.uw.r.appspot.com/api/stores/10`
    const res: any = await axios.get(endpoint)
    return res.data.store.items.map((i: any) => {
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
  }

  name: string
  position: Vector
  score: number
  weight: number
  width: number
  height: number
  imageUrl: string
  image?: any
}
