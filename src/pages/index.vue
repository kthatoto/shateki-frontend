<template lang="pug">
.shateki
  .shateki__top__wrapper
  .shateki__canvas__wrapper
    .shateki__stand__top__wrapper
    .canvas__wrapper
      canvas.canvas#shateki-canvas(width="1200" height="600")
    .shateki__stand__wrapper
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'

import useCanvas from '@/canvas/shateki/index'
import Item from '@/models/item'

export default defineComponent({
  meta: { mustBeAuthenticated: true },
  setup (_, context) {
    const shatekiId: number = 10

    const items = ref<Item[]>([])
    Item.fetchList(shatekiId).then((itemsResponse: Item[]) => items.value = itemsResponse)
    useCanvas(items)

    return {}
  }
})
</script>

<style lang="stylus" scoped>
.shateki
  width: 100%
  height: 100vh
  padding-top: 60px
  @media screen and (min-height:900px) {
    padding-top: 100px
  }
  background-color: #373b6b
  overflow: hidden
  &__top__wrapper
    height: 200px
    width: 100%
    position: absolute
    top: 0px
    background-image: url('~@/assets/images/background/lantern.png')
    background-size: cover
    background-repeat: no-repeat
    background-position: center
    z-index: 2;
  &__canvas__wrapper
      margin: 0 auto
      width: 1380px
      height: 700px
      max-height: 100%
      position: relative
      background-image: url('~@/assets/images/background/stand.png')
      background-position:  center
      background-repeat: no-repeat
      background-size: cover
  &__stand__top__wrapper
    margin: auto;
    width: 1380px
    height: 200px
    max-height: calc(100vh - 600px)
    position: absolute
    top: -130px
    left: 0;
    right: 0;
    z-index: 1;
    background-image: url('~@/assets/images/background/top.png')
    background-size: cover
    background-repeat: no-repeat
    background-position: center
  &__stand__wrapper
    margin: auto
    height: 200px;
    width: 1300px
    position: absolute
    bottom: -199px;
    left: 0;
    right: 0;
    background-size: cover
    background-image: url('~@/assets/images/background/bottom.png')
  .canvas
    width: 100%
    height: 100%
    &__wrapper
      margin: auto
      width: 1200px
      height: 600px
      position: absolute
      bottom: 0
      left: 0;
      right: 0;
</style>
