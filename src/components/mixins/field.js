export default {
  props: {
    value: {
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    extra: {
      type: Object,
      default () {
        return {}
      }
    },
    validate: {
      type: Object,
      default: null
    }
  },

  methods: {
    onChange (e) {
      this.$emit('change', e.target.value)
    }
  },

  created () {
    if (this.validate && typeof this.$validate === 'function') {
      this.$watch('value', () => {
        // from plugins/validator
        this.$validate()
      })
    }
  }
}
