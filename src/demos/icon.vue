<template>
  <div class="fs-64">
    <c-pane>
      <c-icon>down</c-icon>
      <c-icon>user</c-icon>
      <c-icon>lock</c-icon>
      <c-icon>menu</c-icon>
      <c-icon>demo</c-icon>
      <c-icon>chart</c-icon>
      <c-icon>reload</c-icon>
      <c-icon>back</c-icon>
      <c-icon>view</c-icon>
      <c-icon>github</c-icon>
    </c-pane>
    <c-pane>
      <p>use ligatures in iconfont, see <a href="https://en.wikipedia.org/wiki/Typographic_ligature">Typographic ligature</a></p>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CIcon from 'components/c-icon'

export default {
  components: {
    CPane,
    CIcon
  }
}
</script>

<style src="styles/demo"></style>
