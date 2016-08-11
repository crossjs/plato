<template>
  <div :class="['c-form-cell', className]">
    <c-icon class="c-form-cell-icon">{{icon}}</c-icon>
    <c-label class="c-form-cell-label">{{label}}</c-label>
    <slot></slot>
  </div>
</template>

<script>
import CIcon from './c-icon'
import CLabel from './c-label'
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },

  components: {
    CIcon,
    CLabel
  }
}
</script>

<style src="plato-styles/form-cell"></style>
