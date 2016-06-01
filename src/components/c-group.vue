<template>
  <div :class="['c-group', class]">
    <h5 class="c-group-title"
      v-if="title">{{title}}</h5>
    <div class="c-group-cells"
      v-if="cells">
      <c-cell v-for="cell in cells"
        class="c-group-cell"
        :model="cell"></c-cell>
    </div>
  </div>
</template>

<script>
import CCell from './c-cell'
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
    CCell
  }
}
</script>

<style src="styles/components/group"></style>
