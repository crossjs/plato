<template>
  <div class="c-list"
    :class="[cls]">
    <h5 class="c-list-title"
      v-if="title">{{title}}</h5>
    <div class="c-list-items"
      v-if="items">
      <list-item
        v-for="column in columns"
        :column="column"
        :value="items[$key]">
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from './c-list-item'
export default {
  props: {
    cls: {
      type: String,
      default: ''
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

  components: {
    ListItem
  }
}
</script>

<style src="styles/components/list"></style>
