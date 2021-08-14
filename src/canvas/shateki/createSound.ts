export default (sound: string) => {
  const audio = new Audio(sound)
  audio.currentTime = 0
  audio.loop = false
  audio.play()
}
