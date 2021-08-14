<template lang="pug">
.shateki
  .canvas__wrapper
    canvas.canvas#shateki-canvas(width="1200" height="600")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'

import useCanvas from '@/canvas/shateki/index'
import Item from '@/models/item'

export default defineComponent({
  setup (_, context) {
    const shatekiId = context.root.$route.params.id

    const items = ref<Item[]>([])
    Item.fetchList(shatekiId).then((itemsResponse: Item[]) => items.value = itemsResponse)
    useCanvas(items)

    return {}
  }
})
</script>

<style lang="stylus" scoped>
.shateki
  padding-top: 32px
  .canvas
    width: 100%
    height: 100%
    &__wrapper
      margin: auto
      width: 1200px
      height: 600px
      border: 1px solid black
</style>
