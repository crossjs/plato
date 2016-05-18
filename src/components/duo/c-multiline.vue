<template>
  <div class="c-multiline"
    :class="[cls, {editing: editing}]">
    <template v-if="editing">
      <textarea
        class="c-multiline-textarea"
        type="text"
        :field="field"
        v-model="value"
        v-bind="attrs"
        v-validate="validate"
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
