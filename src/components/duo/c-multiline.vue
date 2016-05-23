<template>
  <div :class="['c-multiline', class, {editing: editing}]">
    <template v-if="editing">
      <textarea class="c-multiline-textarea"
        :field="field"
        v-model="value"
        v-bind="attrs"
        debounce="500"></textarea>
    </template>
    <template v-else>
      {{value}}
    </template>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/multiline"></style>
