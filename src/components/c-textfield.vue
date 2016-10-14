<template>
  <label class="c-textfield">
    <input
      :type="type"
      :value="value"
      v-bind="attrs"
      @input="onChange">
  </label>
</template>

<script>
import mBase from './mixins/base'
import mField from './mixins/field'

export default {
  mixins: [mBase, mField],

  props: {
    type: {
      type: String,
      default: 'text',
      validator (val) {
        // time month date datetime-local week NOT supported
        return /^(text|password|search|email|tel|url|number)$/.test(val)
      }
    }
  }
}
</script>

<style src="styles/components/textfield"></style>
