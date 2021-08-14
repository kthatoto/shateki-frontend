import { appStores } from '@/stores/appStores'

export default (context: any) => {
  context.root.$firebase.auth().onAuthStateChanged((user: any) => {
    if (!user || !user.emailVerified) {
      const message = !user ? 'Please signin' : 'Please confirm your email address'
      context.root.$message({ message, type: 'warning', duration: 5000 })
      return context.root.$router.push('/signin')
    }
  })
}
