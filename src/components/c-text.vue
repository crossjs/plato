<template>
  <div class="c-text"
    :class="[cls]">
    <template v-if="state === 1">
      <input
        class="c-text-input"
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

<style src="styles/components/text"></style>
