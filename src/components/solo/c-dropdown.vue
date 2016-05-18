<template>
  <div class="c-dropdown"
    :class="[cls]">{{_label}}</div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField],

  computed: {
    _options () {
      return this.attrs.options || []
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
