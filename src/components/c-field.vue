<template>
  <div :class="['c-field', cls]">
    <c-icon class="c-field-icon"><slot name="icon">{{icon}}</slot></c-icon>
    <c-label class="c-field-label"><slot name="label">{{label}}</slot></c-label>
    <slot></slot>
  </div>
</template>

<script>
import CIcon from './c-icon'
import CLabel from './c-label'
export default {
  props: {
    cls: {
      type: [String, Array],
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

<style src="styles/components/field"></style>
