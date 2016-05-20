export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 0
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
      default: () => {}
    },
    validate: {
    }
  },

  computed: {
    editing () {
      return this.state === 1 && (!this.attrs || !this.attrs.readonly)
    },
    _attrs () {
      return { ...this.attrs, ...extractValidate(this.validate) }
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
