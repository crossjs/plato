<template>
  <div :class="['c-group', class]">
    <h5 class="c-group-title"
      v-if="title">{{title}}</h5>
    <div class="c-group-cells"
      v-if="items">
      <cell class="c-group-cell"
        v-for="column in columns"
        :state="state"
        :field="$key"
        :column="column"
        :value="items[$key]"
        @mutate="_mutate($key, $arguments)"></cell>
    </div>
  </div>
</template>

<script>
import Cell from './c-cell'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    _mutate (key, [val]) {
      this.$emit('mutate', key, val)
    }
  },

  components: {
    Cell
  }
}
</script>

<style src="styles/components/group"></style>
