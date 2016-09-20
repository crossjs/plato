<template>
  <label :class="['c-checkbox', cls, {checked: _checked}]">
    <input type="checkbox"
      :field="field"
      :value="value"
      :checked="_checked"
      :true-value="_truthy"
      :false-value="_falsy"
      v-bind="attrs"
      @change="_mutate">
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
    _mutate (e) {
      this.$emit('mutate', e.target.checked ? this._truthy : this._falsy)
    }
  }
}
</script>

<style src="styles/components/checkbox"></style>
