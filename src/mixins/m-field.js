export default {
  props: {
    cls: {
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
      if (this.state !== 1 || !this.validate) {
        return this.attrs || {}
      }
      return Object.assign({
        'v-validate': this.validate
      }, this.attrs, this.validate)
    }
  }
}
