<template>
  <div class="d-image">
    <c-pane>
      <c-image src="images/logo.png"></c-image>
    </c-pane>
    <c-pane>
      <c-image
        width="80" height="60"></c-image>
    </c-pane>
    <c-pane>
      <c-image src="images/logo.png"
        width="800" height="600"></c-image>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CImage from 'components/c-image'

export default {
  components: {
    CPane,
    CImage
  }
}
</script>

<style src="styles/demo"></style>
