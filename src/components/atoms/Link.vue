<template lang="pug">
nuxt-link(:to="to")
  el-link(:type="type" :disabled="disabled")
    slot
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
    type: { type: String, required: false, default: 'default' },
    disabled: { type: Boolean, required: false, default: null }
  }
}
</script>
