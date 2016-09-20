export default {
  props: {
    align: {
      type: String,
      default: ''
    },
    value: {
      default: ''
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
    extra: {
      type: Object,
      default () {
        return {}
      }
    },
    validate: null
  },

  methods: {
    _mutate (e) {
      this.$emit('mutate', e.target.value)
    }
  },

  // dynamically set watcher in created hook?
  watch: {
    value () {
      if (this.validate) {
        this.$validate()
      }
    }
  }
}
