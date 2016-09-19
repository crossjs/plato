<template>
  <i :class="['c-icon', cls]"><slot></slot></i>
</template>

<script>
/**
 * c-icon
 *
 * @desc iconfont
 * @param {string}  [class]   css class
 * @param {string}  [value]   ligature
 * @param {slot}    [slot]    same as value
 *
 * @example
 *   <c-icon cls="my-icon" value="back"></c-icon>
 *   <c-icon cls="my-icon">back</c-icon>
 */
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    value: {
      default: ''
    }
  }
}
</script>

<style src="styles/components/icon"></style>
