<template>
  <div :class="['c-multiline', className]">
    <textarea class="c-multiline-textarea"
      :field="field"
      :validate="validate"
      :value="value"
      v-bind="attrs"
      debounce="500"></textarea>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField]
}
</script>

<style src="plato-styles/multiline"></style>
