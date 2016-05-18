<template>
  <div class="c-list"
    :class="[cls]">
    <h5 class="c-list-title"
      v-if="title">{{title}}</h5>
    <div class="c-list-items"
      v-if="items">
      <list-item
        v-for="column in columns"
        :state="state"
        :field="$key"
        :column="column"
        :value="items[$key]"
        @mutate="_mutate($key, $arguments)">
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
    ListItem
  }
}
</script>

<style src="styles/components/list"></style>
