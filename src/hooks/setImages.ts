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
          const fbItem: FBItem = fbItems.find((fbi: FBItem) => fbi.name === item.name)
          item.hp = fbItem.hp
          return item
        })
      })
    }, 3000)
  })
}
