<template>
  <div class="v-misc">
    <c-pane style="background-color:gray">it's pane</c-pane>
    <c-modal :show.sync="showModal">showModal</c-modal>
    <c-modal :show.sync="showSheet" :actions="{}">
      <c-cell direction="row">
        <c-button>Action 1</c-button>
      </c-cell>
      <c-cell direction="row">
        <c-button>Action 2</c-button>
      </c-cell>
    </c-modal>
    <c-pane>
      <c-cell direction="column" style="height:100px">
        <c-flex align="center" @click="this.showModal=true">Show Modal</c-flex>
        <c-flex align="center" @click="this.showSheet=true">Show sheet-like Modal</c-flex>
      </c-cell>
      <c-cell direction="row">
        <c-icon class="c-cell-icon">user</c-icon>
        <c-label class="c-cell-label">Align Center</c-label>
        <c-flex align="center">
          <c-checkbox :value.sync="model2.value"></c-checkbox>
        </c-flex>
      </c-cell>
      <c-cell direction="row">
        <c-icon class="c-cell-icon">lock</c-icon>
        <c-label class="c-cell-label">Align Right</c-label>
        <c-flex align="right">
          <c-checkbox :value.sync="model1.value"></c-checkbox>
        </c-flex>
      </c-cell>
    </c-pane>
    <c-image class="img1" src="images/logo.png"></c-image>
    <c-image class="img2" src="images/logo.png"
      width="500"
      height="500"></c-image>
  </div>
</template>

<script>
import CImage from 'plato-components/c-image'
import CPane from 'plato-components/c-pane'
import CCell from 'plato-components/c-cell'
import CIcon from 'plato-components/c-icon'
import CLabel from 'plato-components/c-label'
import CCheckbox from 'plato-components/c-checkbox'
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

  methods: {
    click1 () {
      this.click1ed = true
    },
    click2 () {
      this.click2ed = true
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
