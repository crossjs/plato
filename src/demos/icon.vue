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

<style src="styles/demo"></style>
