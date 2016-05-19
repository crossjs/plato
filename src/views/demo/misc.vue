<template>
  <div class="demo-misc">
    <pane>pane</pane>
    <flex-box>
      <flex-item>flex-item-1</flex-item>
      <flex-item>flex-item-2</flex-item>
      <flex-item>flex-item-3</flex-item>
    </flex-box>
  </div>
</template>

<script>
import Pane from 'solo/c-pane'
import FlexBox from 'solo/c-flex-box'
import FlexItem from 'solo/c-flex-item'
export default {
  components: {
    Pane,
    FlexBox,
    FlexItem
  }
}
</script>

<style src="styles/views/demo-misc"></style>
