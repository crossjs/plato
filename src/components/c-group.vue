<template>
  <div :class="['c-group', cls]">
    <c-title cls="c-group-title"
      v-if="title">{{title}}</c-title>
    <div class="c-group-cells"
      v-if="cells">
      <c-group-cell v-for="cell in cells"
        :model="cell"></c-group-cell>
    </div>
  </div>
</template>

<script>
import CTitle from './c-title'
import CGroupCell from './c-group-cell'
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    cells: {
      type: Array,
      default () {
        return []
      }
    }
  },

  components: {
    CTitle,
    CGroupCell
  }
}
</script>

<style src="styles/components/group"></style>
