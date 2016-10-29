<template>
  <div class="d-icon">
    <c-pane>
      <span class="d-icon-slot" v-for="(value, key, index) in entities">
        <c-icon class="fs-64">{{key}}</c-icon>
        <i class="d-icon-name">{{key}}</i>
      <span>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CIcon from 'components/c-icon'
import entities from 'components/assets/icon-entities'

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

<style src="styles/demo"></style>
