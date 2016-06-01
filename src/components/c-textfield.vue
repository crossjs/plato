<template>
  <div :class="['c-textfield', class]">
    <input class="c-form-field c-textfield-input"
      type="text"
      :field="field"
      v-model="value"
      v-bind="_attrs"
      @change="_validate"
      debounce="500">
  </div>
</template>

<script>
import mField from './m-form-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/textfield"></style>
