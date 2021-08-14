<template lang="pug">
.signup
  el-card.signup__card
    .signup__header(slot="header")
      h2 Signup
    el-form.signup__form(label-width="90px" :model="form" ref="form" :rules="rules")
      transition(name="alert")
        el-alert.signup__alert(v-if="alert.showing" @close="alert.showing = false"
          :type="alert.type" :title="alert.message" show-icon)
      el-form-item(label="email" prop="email")
        el-input(v-model="form.email")
      el-form-item(label="password" prop="password")
        el-input(v-model="form.password" type="password")
      el-form-item.-longLabel(label="password confirmation" prop="passwordConfirmation"
        :error="errors.passwordConfirmation")
        el-input(v-model="form.passwordConfirmation" type="password")
      el-button.signup__button(@click="signup" type="primary" :loading="form.loading") signup
    .signup__link
      Link(to="/signin") Singin
</template>

<script>
export default {
  meta: { mustBeGuest: true },
  data () {
    return {
      form: {
        email: '',
        password: '',
        passwordConfirmation: '',
        loading: false
      },
      alert: {
        type: null, // 'error' | 'success'
        message: '',
        showing: false
      },
      rules: {
        email: [{ required: true }, { type: 'email', trigger: 'blur' }],
        password: [{ required: true }]
      },
      errors: { email: null, password: null, passwordConfirmation: null }
    }
  },
  created () {
    this.form.email = 'kthatoto@gmail.com'
    this.form.password = 'password'
    this.form.passwordConfirmation = 'password'
  },
  methods: {
    customValidate () {
      if (this.form.password !== this.form.passwordConfirmation) {
        this.errors.passwordConfirmation = 'password does not match to confirmation'
      }
      return Object.values(this.errors).every(v => v === null)
    },
    clearErrors () {
      this.errors = { email: null, password: null, passwordConfirmation: null }
      this.alert = { type: null, message: '', showing: false }
    },
    async signup () {
      this.clearErrors()
      const valid = await this.$refs.form.validate()
      const customValid = await this.customValidate()
      if (!(valid && customValid)) return
      this.form.loading = true
      const res = await this.$firebase.auth().createUserWithEmailAndPassword(
        this.form.email, this.form.password
      ).catch((error) => {
        this.alert = { type: 'error', message: error.message, showing: true }
        this.form.loading = false
      })
      if (!res) return
      await res.user.sendEmailVerification()
      this.form.loading = false
      this.$router.push('/signin')
      this.$message({
        message: 'Signup successful. Confirmation mail is sent',
        type: 'success',
        duration: 10000,
        showClose: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
sign-form(signup)
.signup
  .-longLabel
    >>> .el-form-item__label
      line-height: 20px
</style>
