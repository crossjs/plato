export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: ''
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
      if (this.validate && this.$validation && this.$validate) {
        this.$validate()
      }
      this.$emit('mutate', e.target.value)
    }
  }
}
