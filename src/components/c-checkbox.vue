<template>
  <label class="c-checkbox" :class="{'checked': _checked}">
    <input type="checkbox"
      :field="field"
      :value="value"
      :checked="_checked"
      :true-value="_truthy"
      :false-value="_falsy"
      v-bind="attrs"
      @change="onChange">
  </label>
</template>

<script>
import mBase from './mixins/base'
import mField from './mixins/field'

export default {
  mixins: [mBase, mField],

  props: {
    // override
    value: {
      default: false
    }
  },

  computed: {
    _truthy () {
      if (this.extra.hasOwnProperty('true-value')) {
        return this.extra['true-value']
      }
      return true
    },
    _falsy () {
      if (this.extra.hasOwnProperty('false-value')) {
        return this.extra['false-value']
      }
      return false
    },
    _checked () {
      return this.value === this._truthy
    }
  },

  methods: {
    // override
    onChange (e) {
      this.$emit('change', e.target.checked ? this._truthy : this._falsy)
    }
  }
}
</script>

<style src="styles/components/checkbox"></style>
