<template>
  <div :class="['c-form', className]">
    <form @submit.prevent="submit"
      autocomplete="off" novalidate>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    submit: {
      type: Function,
      default: () => true
    }
  }
}
</script>

<style src="plato-styles/form"></style>
