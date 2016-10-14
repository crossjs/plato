export default {
  props: {
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
    onChange (e) {
      this.$emit('change', e.target.value)
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
