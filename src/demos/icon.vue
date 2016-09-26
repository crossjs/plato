<template>
  <div>
    <c-row :flex="false">
      <c-icon cls="fs-64" v-for="(value, key) in maps">{{key}}</c-icon>
      <p>use <a href="https://en.wikipedia.org/wiki/Typographic_ligature">ligatures</a> in iconfont, for modern browsers</p>
    </c-row>
    <c-row :flex="false">
      <c-icon cls="fs-64" v-for="(value, key) in maps" v-html="value"></c-icon>
      <p>use unicode in iconfont, for old browsers</p>
    </c-row>
  </div>
</template>

<script>
import CRow from 'components/c-row'
import CIcon from 'components/c-icon'
import maps from 'styles/fonts/plato.maps'

export default {
  data () {
    return {
      maps
    }
  },

  components: {
    CRow,
    CIcon
  }
}
</script>

<style src="styles/demo"></style>
