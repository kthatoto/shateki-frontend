import axios, { AxiosResponse } from 'axios'

interface ItemsResponse {
  items: Item[]
}

export default class Item {
  static async fetchList () {
    const endpoint = `https://aluminum-318311.uw.r.appspot.com/api/stores/10`
    const res: any = await axios.get(endpoint)
    return res.data.store.items
  }

  image?: any
  image_url?: string
}
