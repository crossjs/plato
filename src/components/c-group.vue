<template>
  <div :class="['c-group', class]">
    <h5 class="c-group-title"
      v-if="title">{{title}}</h5>
    <div class="c-group-cells"
      v-if="cells">
      <c-group-cell v-for="cell in cells"
        :model="cell"></c-group-cell>
    </div>
  </div>
</template>

<script>
import CGroupCell from './c-group-cell'
export default {
  props: {
    class: {
      type: String,
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
    CGroupCell
  }
}
</script>

<style src="styles/components/group"></style>
