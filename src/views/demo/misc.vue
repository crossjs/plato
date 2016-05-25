<template>
  <div class="demo-misc">
    <c-image class="img1" src="images/logo.png"></c-image>
    <c-image class="img2" src="images/logo.png"
      width="500"
      height="500"></c-image>
    <pane>pane</pane>
    <flex-box>
      <flex-item>flex-item-1</flex-item>
      <flex-item>flex-item-2</flex-item>
      <flex-item>flex-item-3</flex-item>
    </flex-box>
  </div>
</template>

<script>
import CImage from 'solo/c-image'
import Pane from 'solo/c-pane'
import FlexBox from 'solo/c-flex-box'
import FlexItem from 'solo/c-flex-item'
export default {
  components: {
    CImage,
    Pane,
    FlexBox,
    FlexItem
  }
}
</script>

<style src="styles/views/demo-misc"></style>
