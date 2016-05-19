<template>
  <div :class="['c-text', class, {editing: editing}]">
    <template v-if="editing">
      <input class="c-text-input"
        type="text"
        :field="field"
        v-model="value"
        v-bind="_attrs"
        v-validate="validate"
        debounce="500">
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

<style src="styles/components/text"></style>
