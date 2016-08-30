<template>
  <div :class="['c-icon', className]"><slot>{{value}}</slot></div>
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
 *   <c-icon class="my-icon" value="back"></c-icon>
 *   <c-icon class="my-icon">back</c-icon>
 */
export default {
  props: {
    className: {
      type: [String, Array],
      default: ''
    },
    value: {
      default: ''
    }
  }
}
</script>

<style src="plato-styles/icon"></style>
