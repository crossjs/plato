<template>
  <ul :class="['c-validation', cls]"
    v-if="errors.length">
    <li v-for="error in errors">
      {{error.message}}
    </li>
  </ul>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],
  props: {
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
  },

  computed: {
    errors () {
      return this.validation.errors.filter(error => !this.field || this.field === error.field)
    }
  }
}
</script>

<style src="styles/components/validation"></style>
