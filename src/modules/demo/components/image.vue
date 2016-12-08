<template>
  <div class="d-image">
    <c-row class="padding" :flex="false">
      <p>flexible: true</p>
      <c-image src="images/qr@1x.png" alt="qr"></c-image>
      <c-image src="images/qr@2x.png" alt="qr"></c-image>
      <c-image src="images/qr@3x.png" alt="qr"></c-image>
    </c-row>
    <c-row class="padding" :flex="false">
      <p>flexible: false</p>
      <c-image :flexible="0" src="images/qr@1x.png"></c-image>
      <c-image :flexible="0" src="images/qr@2x.png"></c-image>
      <c-image :flexible="0" src="images/qr@3x.png"></c-image>
    </c-row>
    <c-row class="padding" :flex="false">
      <p>resized by `data-dpr`, and replace css (background-image) with <a href="https://github.com/crossjs/postcss-flexible">postcss-flexible</a></p>
      <c-image class="url"
        width="100" height="100"></c-image>
    </c-row>
    <c-row class="padding" :flex="false">
      <p>no src</p>
      <c-image class="no-src"
        width="80" height="60"></c-image>
      <c-image class="no-src"
        width="60" height="80"></c-image>
    </c-row>
    <c-row class="padding" :flex="false">
      <p>default</p>
      <c-image src="images/logo.png"></c-image>
    </c-row>
    <c-row class="padding" :flex="false">
      <p>too wide</p>
      <c-image src="images/logo.png"
        width="1280" height="600"></c-image>
    </c-row>
  </div>
</template>

<script>
import CRow from 'components/core/row'
import CImage from 'components/core/image'

export default {
  components: {
    CRow,
    CImage
  }
}
</script>

<style scoped>
.no-src {
  background-color: var(--primary);
}

.url {
  background-image: url(../styles/images/wx@2x.png);
}
</style>
