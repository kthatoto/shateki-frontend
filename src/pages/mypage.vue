<template lang="pug">
.mypage
  el-card.mypage__card
    .mypage__header(slot="header")
      h2 Mypage
    .mypage__row
      label メールアドレス
      el-input(v-model="email" readonly)
    .mypage__row
      label 表示名
      el-input(v-model="name")
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'

import useAuthentication from '@/hooks/useAuthentication'

export default defineComponent({
  setup (_, context) {
    useAuthentication(context)

    const state = reactive<{
      email: string
      name: string
    }>({
      email: '',
      name: ''
    })

    setTimeout(() => {
      const onAuthStateChanged = context.root.context.app.onAuthStateChanged
      const currentUser = context.root.$firebase.auth().currentUser
      if (onAuthStateChanged && currentUser) {
        state.email = currentUser.email
      }
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="stylus" scoped>
.mypage
  background-color: #f4f4f4
  padding: 150px 0
  height: calc(100vh - 60px)
  &__card
    width: 400px
    margin: auto
    h2
      text-align: center
  &__row
    text-align: left
    margin-bottom: 16px
</style>
