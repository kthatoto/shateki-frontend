<template lang="pug">
el-container.default
  el-header.default__header
    nuxt-link(to="/")
      .logo 射的
    el-dropdown.dropdown(trigger="click" @command="handleCommand")
      el-button.dropdown__button
        icon.icon(name="user")
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(command="signout") signout
  nuxt.root
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'

export default defineComponent({
  setup (_, context: any) {
    const handleCommand = (command: string) => {
      if (command === 'signout') signout()
    }
    const signout = async () => {
      await context.root.$firebase.auth().signOut()
      context.root.$message({ message: 'Signout successful', type: 'success', duration: 5000 })
      context.root.$router.push('/')
    }

    return {
      handleCommand,
      signout
    }
  }
})
</script>

<style lang="stylus" scoped>
.default
  &__header
    display: flex
    justify-content: space-between
    border-bottom: 1px solid borderColor
    .dropdown
      height: 100%
      &__button
        height: 100%
        width: 100px
        border-radius: 0
        border-top: none
        border-bottom: none
    .logo
      font-weight: bold
      font-size: 32px
      background-color: navy
      color: white
      line-height: 60px
      padding: 0 16px
</style>
