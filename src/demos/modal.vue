<template>
  <div>
    <c-modal :show="show" :callback="callback">i'm modal, i'm modal, i'm modal, i'm modal, i'm modal, i'm modal, i'm modal.</c-modal>
    <c-pane><c-button>show modal</c-button></c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CButton from 'components/c-button'
import CModal from 'components/c-modal'

export default {
  data () {
    return {
      show: true,
      callback () {
        this.show = false
      }
    }
  },

  components: {
    CPane,
    CButton,
    CModal
  }
}
</script>
