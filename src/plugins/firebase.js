import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import { appStores } from '@/stores/appStores'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.FIREBASE_DATABASEURL,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
    }
  )
}

export default ({ app, redirect }, inject) => {
  app.onAuthStateChanged = false

  firebase.auth().onAuthStateChanged((user) => {
    const meta = app.context.from.meta[0]

    app.onAuthStateChanged = true
    if (!user) {
      appStores.rootStore.clearUser()
      if (meta.mustBeAuthenticated) {
        app.$message({ message: 'Please signin', type: 'warning', duration: 5000 })
        return redirect('/signin')
      }
      return
    }
    appStores.rootStore.setUser({ ...user, jwt: user.ya })

    if (meta.mustBeEmailVerified && !user.emailVerified) {
      app.$message({
        message: 'Please confirm your email address',
        type: 'warning',
        duration: 5000
      })
      return redirect('/')
    }
    if (meta.mustBeGuest) {
      return redirect('/')
    }
  })
  inject('firebase', firebase)
}
