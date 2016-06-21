<template>
  <div class="demo-misc">
    <c-image class="img1" src="images/logo.png"></c-image>
    <c-image class="img2" src="images/logo.png"
      width="500"
      height="500"></c-image>
    <c-pane>pane</c-pane>
    <c-cell direction="row">
      <c-flex>flex-item-1</c-flex>
      <c-flex>flex-item-2</c-flex>
      <c-flex>flex-item-3</c-flex>
    </c-cell>
    <c-cell direction="row">
      <c-icon class="c-cell-icon">user</c-icon>
      <c-label class="c-cell-label">Label1</c-label>
      <c-flex align="right">
        <c-checkbox :value.sync="model2.value"></c-checkbox>
      </c-flex>
    </c-cell>
    <c-cell direction="row">
      <c-icon class="c-cell-icon">lock</c-icon>
      <c-label class="c-cell-label">Label2</c-label>
      <c-flex align="right">
        <c-checkbox :value.sync="model1.value"></c-checkbox>
      </c-flex>
    </c-cell>
  </div>
</template>

<script>
import CImage from 'components/c-image'
import CPane from 'components/c-pane'
import CCell from 'components/c-cell'
import CIcon from 'components/c-icon'
import CLabel from 'components/c-label'
import CCheckbox from 'components/c-checkbox'
import CFlex from 'components/c-flex'
import CModal from 'components/c-modal'
export default {
  data () {
    return {
      model1: {
        label: 'Label',
        value: true
      },
      model2: {
        label: 'Label',
        value: 1
      }
    }
  },

  components: {
    CImage,
    CPane,
    CIcon,
    CLabel,
    CCheckbox,
    CCell,
    CFlex,
    CModal
  }
}
</script>

<style src="styles/views/demo-misc"></style>
