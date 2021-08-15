<template lang="pug">
.shateki
  .shateki__start__view(@click="startGame()" v-if="!audioPlaying")
  .shateki__top__wrapper
  .shateki__canvas__wrapper
    .shateki__stand__top__wrapper
    .canvas__wrapper
      canvas.canvas#shateki-canvas(width="1200" height="600")
    .shateki__stand__wrapper
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'
import useCanvas from '@/canvas/shateki/index'
import bgmSound from '@/assets/musics/background.mp3'
import setImages from '@/hooks/setImages'

export default defineComponent({
  setup (_, context: any) {
    useCanvas()
    setImages(context)

    let uid: string | undefined = undefined
    const firebase = context.root.$firebase
    const database = firebase.database()
    appStores.rootStore.setDatabase(database)

    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) return
      uid = user.uid
      const userRef = firebase.database().ref(`users/${uid}`)
      userRef.on('value', (snapshot: any) => {
        const data = snapshot.val()
        const common = {
          name: user.displayName,
          photoURL: user.photoURL,
          online: true,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }
        database.ref(`users/${uid}`).update(data ? {
          ...data,
          ...common
        } : {
          uid,
          score: 0,
          ...common
        })
      })
    })
    onBeforeUnmount(() => {
      database.ref(`users/${uid}`).update({ online: false })
    })
  },
  data () {
    return {
      audioPlaying: false
    }
  },
  methods: {
    startGame () {
      if (this.audioPlaying) return
      this.audioPlaying = true
      const audio = new Audio(bgmSound)
      audio.currentTime = 0
      audio.volume = 0.05
      audio.loop = true
      audio.play()
    }
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
  &__start__view
    position: absolute
    top: 0
    width: 100vw
    height: 100vh
    z-index: 2
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
    height: 180px
    max-height: calc(100vh - 600px)
    position: absolute
    top: -110px
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
