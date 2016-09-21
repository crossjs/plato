<template>
  <div class="d-image">
    <c-pane>
      <p>flexible: true</p>
      <c-image src="images/qr@1x.png"></c-image>
      <c-image src="images/qr@2x.png"></c-image>
      <c-image src="images/qr@3x.png"></c-image>
    </c-pane>
    <c-pane>
      <p>flexible: false</p>
      <c-image :flexible="false" src="images/qr@1x.png"></c-image>
      <c-image :flexible="false" src="images/qr@2x.png"></c-image>
      <c-image :flexible="false" src="images/qr@3x.png"></c-image>
    </c-pane>
    <c-pane>
      <p>no src</p>
      <c-image
        width="80" height="60"></c-image>
    </c-pane>
    <c-pane>
      <p>default</p>
      <c-image src="images/logo.png"></c-image>
    </c-pane>
    <c-pane>
      <p>auto resize</p>
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
