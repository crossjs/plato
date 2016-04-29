export default {
  props: ['state', 'value'],

  watch: {
    state (v) {
      if (v === 0) {
        this.value = this.cache
      } else {
        this.cache = this.value
      }
    },
    value (v) {
      this.$nextTick(() => {
        this.$emit('mutate', v)
      })
    }
  }
}
