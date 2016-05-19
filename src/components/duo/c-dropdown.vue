<template>
  <div :class="['c-dropdown', class, {editing: editing}]">
    <template v-if="editing">
      <select
        class="c-dropdown-select"
        :field="field"
        v-model="value"
        v-bind="_attrs"
        v-validate="validate">
        <option v-for="option in _options" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </template>
    <template v-else>
      {{_label}}
    </template>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField],

  computed: {
    _options () {
      return this.attrs.options || []
    },
    _attrs () {
      /*eslint no-unused-vars:[0]*/
      const { options, ...rest } = this.attrs
      return rest
    },
    _label () {
      let label
      this._options.some(option => {
        if (option.value === this.value) {
          label = option.label
          return true
        }
        return false
      })
      return label || '-'
    }
  }
}
</script>

<style src="styles/components/dropdown"></style>
