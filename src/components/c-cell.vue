<template>
  <div :class="['c-cell', class]" @click="click(modal)">
    <c-icon class="c-cell-icon"
      :class="model.icon"></c-icon>
    <c-label class="c-cell-label">{{model.label}}</c-label>
    <c-value class="c-cell-value"
      :type="model.type"
      :value="model.value"></c-value>
  </div>
</template>

<script>
import CIcon from './c-icon'
import CLabel from './c-label'
import CValue from './c-value'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    click: {
      type: Function,
      default: () => {}
    },
    model: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  components: {
    CIcon,
    CLabel,
    CValue
  }
}
</script>

<style src="styles/components/cell"></style>
