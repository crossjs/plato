<template>
  <div :class="['c-validation', className]">
    <ul class="c-validation-errors"
      v-if="validation.errors">
      <li class="c-validation-error"
        v-for="error in validation.errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    validation: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style src="plato-styles/validation"></style>
