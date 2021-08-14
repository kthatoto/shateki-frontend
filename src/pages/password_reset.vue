<template lang="pug">
.password
  el-card.password__card
    .password__header(slot="header")
      h2 Password Reset
    el-form.password__form(label-width="90px" :model="form" ref="form" :rules="rules")
      transition(name="alert")
        el-alert.password__alert(v-if="alert.showing" @close="alert.showing = false"
          :type="alert.type" :title="alert.message" show-icon)
      el-form-item(label="email" prop="email")
        el-input(v-model="form.email")
      el-button.password__button(@click="reset" type="primary" :loading="form.loading") reset
    .password__link
      Link(to="/signin") Signin
</template>

<script>
export default {
  meta: { mustBeGuest: true },
  data () {
    return {
      form: {
        email: '',
        loading: false
      },
      alert: {
        type: null, // 'error'
        message: '',
        showing: false
      },
      rules: {
        email: [{ required: true }, { type: 'email', trigger: 'blur' }]
      }
    }
  },
  methods: {
    clearAlerts () {
      this.alert = { type: null, message: '', showing: false }
    },
    async reset () {
      this.clearAlerts()
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.form.loading = true
      await this.$firebase.auth()
        .sendPasswordResetEmail(this.form.email)
        .catch((error) => {
          this.alert = { type: 'error', message: error.message, showing: true }
          this.form.loading = false
        })
      if (this.alert.type === 'error') return
      this.form.loading = false
      this.$message({
        message: 'Sent password reset mail',
        type: 'success',
        duration: 3000
      })
    }
  }
}
</script>

<style lang="stylus">
sign-form(password)
</style>
