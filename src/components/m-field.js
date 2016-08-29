export default {
  props: {
    className: {
      type: [String, Array],
      default: ''
    },
    align: {
      type: String,
      default: ''
    },
    value: {},
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

  watch: {
    value () {
      if (this.validate) {
        this.$validate()
      }
    }
  }
}
