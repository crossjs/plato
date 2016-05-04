<template>
  <div class="c-text">
    <template v-if="state === 1">
      <input
        class="c-form-input"
        type="text"
        :field="field"
        v-model="value"
        v-bind="attrs"
        v-validate="validate"
        debounce="500">
    </template>
    <template v-else>
      {{value}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
export default {
  mixins: [mField]
}
</script>
