<template>
  <c-pane class="main">
    <span class="icon-slot" v-for="(value, key, index) in entities">
      <c-icon class="fs-64">{{key}}</c-icon>
      <i class="icon-name">{{key}}</i>
    <span>
  </c-pane>
</template>

<script>
import CPane from 'components/core/pane'
import CIcon from 'components/core/icon'
import entities from 'components/core/assets/icon-entities'

export default {
  data () {
    return {
      entities
    }
  },

  components: {
    CPane,
    CIcon
  }
}
</script>

<style scoped>
.icon-slot {
  width: 33.33333%;
  display: block;
  float: left;
  text-align: center;
}

.icon-name {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.c-icon {
  margin: 0.2em;
}
</style>
