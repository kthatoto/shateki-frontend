export default (sound: string, volume: number = 1) => {
  const audio = new Audio(sound)
  audio.currentTime = 0
  audio.volume = volume
  audio.loop = false
  audio.play()
}
