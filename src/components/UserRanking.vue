<template lang="pug">
.user-ranking
  .ranking(v-for="(user, index) in rankedUsers")
    .flex
      .rank # {{ index + 1 }}
      img.profile-image(v-if="user.photoURL" :src="user.photoURL")
      span.profile-image(v-else)
        icon.icon(name="user")
      .name {{ user.name }}
    .score {{ user.score }}
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'

interface User {
  photoURL?: string
  displayName: string
  score: number
}

export default defineComponent({
  setup (_, context) {
    const firebase = context.root.$firebase
    const database = firebase.database()
    const usersRef = database.ref('users')
    usersRef.on('value', (snapshot: any) => {
      const data = snapshot.val()
      users.value = Object.values(data)
      console.log(users.value)
    })
    const users = ref<User[]>([])
    const rankedUsers = computed(() => {
      return users.value.sort((user1: User, user2: User) => user2.score - user1.score)
    })

    return { rankedUsers }
  }
})
</script>

<style lang="stylus" scoped>
.user-ranking
  position: fixed
  right: 0
  bottom: 0
  width: 300px
  height: 200px
  background-color: rgba(30, 30, 30, 0.7)
  padding: 20px

  .ranking
    display: flex
    justify-content: space-between
    color: white
  .flex
    display: flex
    > div
      margin: 1px
  .rank
    font-weight: bold
    font-size: 18px
  .profile-image
    width: 20px
    height: 20px
    border-radius: 10px
    border: 1px solid lightgray
    .icon
      margin: 3px
      width: 14px
      height: 14px
</style>
