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
    .mypage__row
      label プロフィール画像
      img.mypage__icon(v-if="currentImage" :src="currentImage")
      p(v-else) 現在登録されていません
    .mypage__submit
      el-button(type="primary" @click="save") 保存
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'

import useAuthentication from '@/hooks/useAuthentication'

export default defineComponent({
  setup (_, context: any) {
    useAuthentication(context)

    const state = reactive<{
      currentUser: any
      email: string
      name: string
      currentImage: any
    }>({
      currentUser: undefined,
      email: '',
      name: '',
      currentImage: undefined
    })

    setTimeout(() => {
      const onAuthStateChanged = context.root.context.app.onAuthStateChanged
      state.currentUser = context.root.$firebase.auth().currentUser
      if (onAuthStateChanged && state.currentUser) {
        state.email = state.currentUser.email
        state.name = state.currentUser.displayName
        state.currentImage = state.currentUser.photoURL
      }
    }, 1000)

    const save = async () => {
      state.currentUser.updateProfile({ displayName: state.name })
      context.root.$message({ message: '保存しました', type: 'success', duration: 5000 })
    }

    return {
      ...toRefs(state),
      save
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
    label
      display: block
      margin-bottom: 8px
    p
      font-size: 14px
      color: #999
  &__submit
    text-align: center
  &__icon
    width: 80px
    height: 80px
    border-radius: 40px
  .thumbnail
    width: 100%
    height: 100%
    background-size: contain
    background-repeat: no-repeat
    background-position: center
</style>
