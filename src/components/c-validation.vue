<template>
  <ul :class="['c-validation', cls]"
    v-if="errors.length">
    <li v-for="error in errors">
      {{error.message}}
    </li>
  </ul>
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
  },

  computed: {
    errors () {
      return this.validation.errors.filter(error => !this.field || this.field === error.field)
    }
  }
}
</script>

<style src="styles/components/validation"></style>
