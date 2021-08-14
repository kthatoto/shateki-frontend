<template lang="pug">
.index
  .shateki__list
    nuxt-link.shateki__item(to="/shateki/1")
      .shateki__thumbnail
      .shateki__title
        h3 みんなで射的
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'

export default defineComponent({
  setup (_, context) {
    const database = context.root.$firebase.database()

    const user = appStores.rootStore.state.user
    setTimeout(() => {
      database.ref('users').push({ uid: appStores.rootStore.state.user.uid })
    }, 1000)
  }
})
</script>

<style lang="stylus" scoped>
.index
  padding: 32px
  .shateki
    &__list
      display: flex
    &__thumbnail
      width: 250px
      height: 160px
      background-color: navy
    &__title
      font-size: 18px
</style>
