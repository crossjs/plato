<template>
  <div class="v-misc">
    <c-pane style="background-color:gray">it's pane</c-pane>
    <c-modal :show="showModal" @close="showModal = false">showModal</c-modal>
    <c-modal :show="showSheet" :actions="{}" @close="showSheet = false">
      <c-cell direction="row">
        <c-button>Action 1</c-button>
      </c-cell>
      <c-cell direction="row">
        <c-button>Action 2</c-button>
      </c-cell>
    </c-modal>
    <c-pane>
      <c-cell direction="column" style="height:100px">
        <c-flex align="center" @click.native="showModal=true">Show Modal</c-flex>
        <c-flex align="center" @click.native="showSheet=true">Show sheet-like Modal</c-flex>
      </c-cell>
    </c-pane>
    <c-image class="img1" src="images/logo.png"></c-image>
  </div>
</template>

<script>
import CImage from 'plato-components/c-image'
import CButton from 'plato-components/c-button'
import CPane from 'plato-components/c-pane'
import CCell from 'plato-components/c-cell'
import CFlex from 'plato-components/c-flex'
import CModal from 'plato-components/c-modal'
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
      },
      showModal: false,
      showSheet: false
    }
  },

  components: {
    CImage,
    CButton,
    CPane,
    CCell,
    CFlex,
    CModal
  }
}
</script>
