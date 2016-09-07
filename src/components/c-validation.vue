<template>
  <div :class="['c-validation', cls]">
    <ul class="c-validation-errors"
      v-if="validation.errors">
      <li class="c-validation-error"
        v-for="error in validation.errors"
        v-if="!field || field === error.field">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    validation: {
      type: Object,
      default () {
        return {}
      }
    },
    // filter errors by field
    field: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/validation"></style>
