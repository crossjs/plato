<template>
  <div class="d-avatar">
    <c-pane>
      <p>Squared Text</p>
      <c-avatar></c-avatar>
      <c-avatar>A</c-avatar>
      <c-avatar>李</c-avatar>
      <p>Circle Text</p>
      <c-avatar class="circle"></c-avatar>
      <c-avatar class="circle">A</c-avatar>
      <c-avatar class="circle">李</c-avatar>
      <p>Squared Image</p>
      <c-avatar><img src="images/logo.png"></c-avatar>
      <c-avatar><img src="images/qr@1x.png"></c-avatar>
      <c-avatar><img src="images/qr@2x.png"></c-avatar>
      <c-avatar><img src="images/qr@3x.png"></c-avatar>
      <p>Circle Image</p>
      <c-avatar class="circle"><img src="images/logo.png"></c-avatar>
      <c-avatar class="circle"><img src="images/qr@1x.png"></c-avatar>
      <c-avatar class="circle"><img src="images/qr@2x.png"></c-avatar>
      <c-avatar class="circle"><img src="images/qr@3x.png"></c-avatar>
      <p>Small</p>
      <c-avatar size="small"><img src="images/qr@3x.png"></c-avatar>
      <c-avatar class="circle" size="small"><img src="images/qr@3x.png"></c-avatar>
      <p>Large</p>
      <c-avatar size="large"><img src="images/qr@3x.png"></c-avatar>
      <c-avatar class="circle" size="large"><img src="images/qr@3x.png"></c-avatar>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/core/pane'
import CAvatar from 'components/core/avatar'

export default {
  components: {
    CPane,
    CAvatar
  }
}
</script>

<style src="../styles/index"></style>
