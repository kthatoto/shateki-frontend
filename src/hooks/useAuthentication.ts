import { appStores } from '@/stores/appStores'

export default (context: any) => {
  context.root.$firebase.auth().onAuthStateChanged((user: any) => {
    if (!user || !user.emailVerified) {
      context.root.$message({ message: 'Please signin', type: 'warning', duration: 5000 })
      return context.root.$router.push('/signin')
    }
  })
}
