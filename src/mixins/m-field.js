export default {
  props: {
    state: {
      type: Number,
      default: 0
    },
    value: {
    },
    field: {
      type: String,
      default: ''
    },
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    validate: {
      type: Object,
      default () {
        return {}
      }
    }
  },

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
