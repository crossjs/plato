<template>
  <div :class="['c-textfield', cls]">
    <input class="c-textfield-input"
      :type="type"
      :field="field"
      :value="value"
      v-bind="attrs"
      @input="_mutate">
  </div>
</template>

<script>
import mField from './mixins/field'
export default {
  mixins: [mField],

  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style src="styles/components/textfield"></style>
