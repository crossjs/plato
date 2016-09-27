<template>
  <div class="d-icon">
    <c-pane>
      <span class="d-icon-slot" v-for="(value, key, index) in maps">
        <c-icon cls="fs-64">{{key}}</c-icon>
        <i class="d-icon-name">{{key}}</i>
      <span>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CIcon from 'components/c-icon'
import maps from 'components/assets/maps'

export default {
  data () {
    return {
      maps
    }
  },

  components: {
    CPane,
    CIcon
  }
}
</script>

<style src="styles/demo"></style>
