export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    value: {
      twoWay: true
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

  computed: {
    _attrs () {
      return { ...this.attrs, ...extractValidate(this.validate) }
    }
  },

  methods: {
    _validate () {
      if (!this.validate || !this.$validation) {
        return
      }
      this.$validate()
    }
  }
}

function extractValidate (validate) {
  if (!validate) {
    return null
  }
  return Object.keys(validate).reduce((obj, key) => {
    obj[key] = validate[key].rule
    return obj
  }, {})
}
