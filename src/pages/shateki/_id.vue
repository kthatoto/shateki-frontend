<template lang="pug">
.shateki
  .canvas__wrapper
    canvas.canvas#shateki-canvas(width="1200" height="600")
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import useCanvas from '@/canvas/shateki/index'

export default defineComponent({
  setup (_, context) {
    // const shatekiId = context.root.$route.params.id

    const cnvs = useCanvas()

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
