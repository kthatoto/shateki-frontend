<template lang="pug">
.signin(v-loading="loading")
  el-card.signin__card
    .signin__header(slot="header")
      h2 Signin
    .signin__row
      el-button.signin__buttonTop(@click="googleAuth")
        img.customIcon.-r(src="~/assets/icons/google.png")
        span Signin/Singup with Google
    .signin__row.-last
      el-button.signin__buttonTop(@click="showingEmailForm = !showingEmailForm" type="info")
        icon.icon.-r(name="envelope")
        span Signin/Signup with Email
    el-collapse-transition
      div(v-if="showingEmailForm")
        el-form.signin__form(label-width="90px" :model="form" ref="form" :rules="rules")
          transition(name="alert")
            el-alert.signin__alert(v-if="alert.showing" @close="alert.showing = false"
              :type="alert.type" :title="alert.message" show-icon)
          el-form-item(label="email" prop="email")
            el-input(v-model="form.email")
          el-form-item(label="password" prop="password")
            el-input(v-model="form.password" type="password")
          el-button.signin__button(@click="signin" type="primary" :loading="form.loading") signin
        .signin__link
          Link(to="/signup") Singup
        .signin__link
          Link(to="/password_reset") Password Reset
</template>

<script>
export default {
  meta: { mustBeGuest: true },
  data () {
    return {
      loading: true,
      timerId: undefined,
      showingEmailForm: false,
      form: {
        email: '',
        password: '',
        loading: false
      },
      alert: {
        type: null, // 'error'
        message: '',
        showing: false
      },
      rules: {
        email: [{ required: true }, { type: 'email', trigger: 'blur' }],
        password: [{ required: true }]
      }
    }
  },
  created () {
    this.form.email = 'kthatoto@gmail.com'
    this.form.password = 'password'

    this.timerId = setInterval(() => {
      const onAuthStateChanged = this.$root.context.app.onAuthStateChanged
      const currentUser = this.$firebase.auth().currentUser
      if (onAuthStateChanged && !currentUser) {
        this.loading = false
        clearInterval(this.timerId)
      }
    }, 500)
  },
  beforeDestroy () {
    clearInterval(this.timerId)
  },
  methods: {
    clearAlerts () {
      this.alert = { type: null, message: '', showing: false }
    },
    async signin () {
      this.clearAlerts()
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.form.loading = true
      await this.$firebase.auth().signOut()
      const res = await this.$firebase.auth().signInWithEmailAndPassword(
        this.form.email, this.form.password
      ).catch((error) => {
        this.alert = { type: 'error', message: error.message, showing: true }
        this.form.loading = false
      })
      if (!res) return
      this.form.loading = false
      this.$message({ message: 'Signin success', type: 'success', duration: 5000 })
    },
    // async sendEmailVerification () {
    //   if (!this.$firebase.auth().currentUser) return
    //   await this.$firebase.auth().currentUser.sendEmailVerification()
    //   const email = this.$firebase.auth().currentUser.email
    //   const style = 'color: black; text-decoration: underline'
    //   this.$message({
    //     dangerouslyUseHTMLString: true,
    //     message: `Sent confirmation mail to <span style="${style}">${email}</span>`,
    //     type: 'success',
    //     duration: 0,
    //     showClose: true
    //   })
    // },
    async googleAuth () {
      await this.$firebase.auth().signOut()
      const GoogleAuthProvider = this.$firebase.auth.GoogleAuthProvider
      const provider = new GoogleAuthProvider()
      this.$firebase.auth().signInWithRedirect(provider)
    }
  }
}
</script>

<style lang="stylus" scoped>
sign-form(signin)
.signin
  &__row
    &:not(.-last)
      margin-bottom: 15px
  &__buttonTop
    width: 240px
</style>
