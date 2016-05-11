<template>
  <div class="c-list"
    :class="[cls]">
    <h5 class="c-list-title"
      v-if="title">{{title}}</h5>
    <div class="c-list-items"
      v-if="items.length">
      <div class="c-list-item"
        v-for="item in items"
        track-by="$index">
        <div class="c-list-icon">{{item.icon}}</div>
        <div class="c-list-label">{{item.label}}</div>
        <div class="c-list-value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
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
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style src="styles/components/list"></style>
