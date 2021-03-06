<template lang="pug">
el-container.default
  el-header.default__header
    div
    el-dropdown.dropdown(trigger="click" @command="handleCommand")
      el-button
        template(v-if="signedIn")
          img.profile-image(v-if="profileImage" :src="profileImage")
          .profile-image(v-else)
            icon.icon(name="user")
        template(v-else)
          icon.icon(name="user")

      el-dropdown-menu(slot="dropdown")
        template(v-if="signedIn")
          el-dropdown-item(command="goToPlay") Play
          el-dropdown-item(command="goToMypage") Mypage
          el-dropdown-item(command="signout") Signout
        template(v-else)
          el-dropdown-item(command="goToSignin") Signin
  nuxt.root
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'

export default defineComponent({
  setup (_, context: any) {
    const handleCommand = (command: string) => {
      if (command === 'goToPlay') goToPlay()
      if (command === 'goToMypage') goToMypage()
      if (command === 'signout') signout()
      if (command === 'goToSignin') goToSignin()
    }
    const goToPlay = () => {
      context.root.$router.push('/')
    }
    const goToMypage = () => {
      context.root.$router.push('/mypage')
    }
    const signout = async () => {
      await context.root.$firebase.auth().signOut()
      context.root.$message({ message: 'Signout successful', type: 'success', duration: 5000 })
      context.root.$router.push('/')
      state.signedIn = false
    }
    const goToSignin = () => {
      context.root.$router.push('/signin')
    }

    const state = reactive<{
      signedIn: boolean
      profileImage?: string
    }>({
      signedIn: false,
      profileImage: undefined
    })
    const timerId = setInterval(() => {
      const onAuthStateChanged = context.root.context.app.onAuthStateChanged
      if (!onAuthStateChanged) return
      const currentUser = context.root.$firebase.auth().currentUser
      if (currentUser) {
        state.signedIn = true
        state.profileImage = currentUser.photoURL
      }
      clearInterval(timerId)
      if (!currentUser.displayName) {
        currentUser.updateProfile({ displayName: currentUser.email.split('@')[0] })
      }
    }, 500)

    return {
      handleCommand,
      signout,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="stylus" scoped>
.default
  &__header
    display: flex
    position: fixed
    width: 100%
    justify-content: space-between
    z-index: 3
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
      color: white
      line-height: 60px
      padding: 0 16px
    .profile-image
      width: 40px
      height: 40px
      border-radius: 20px
      border: 1px solid lightgray
      .icon
        margin: 10px
        width: 20px
        height: 20px
</style>
