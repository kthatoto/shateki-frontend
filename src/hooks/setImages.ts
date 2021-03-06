import Item from '@/models/item'
import { appStores } from '@/stores/appStores'

interface Vector { x: number; y: number }
interface FBItem {
  hp: number
  name: string
  position: Vector
}

export default (context: any) => {
  const itemsStore = appStores.itemsStore
  Item.fetchList().then((items: Item[]) => {
    itemsStore.items.value = items
    setTimeout(() => {
      const database = context.root.$firebase.database()
      const itemsRef = database.ref('items')
      itemsRef.on('value', (snapshot: any) => {
        const data = snapshot.val()
        const fbItems: FBItem[] = Object.values(data)

        itemsStore.items.value = itemsStore.items.value.map((item: Item) => {
          const fbItem: FBItem | undefined = fbItems.find((fbi: FBItem) => fbi.name === item.name)
          if (!fbItem) return item
          item.hp = Math.max(fbItem.hp, 0)
          if (item.hp === 0) {
            item.alive = false
          } else {
            item.alive = true
          }
          return item
        })
      })
    }, 3000)
  })

  setInterval(() => {
    const database = context.root.$firebase.database()
    if (!itemsStore.items.value) return
    itemsStore.items.value = itemsStore.items.value.map((item: Item) => {
      if (item.alive) return item
      item.revivalCount += 1
      if (item.revivalCount / 100 > Math.random()) {
        item.hp = item.weight
        item.alive = true
        database.ref(`items/${item.name}`).update({ hp: item.hp })
      }
      return item
    })
  }, 3000)
}
