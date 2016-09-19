<template>
  <div>
    <c-pane><c-button>default</c-button></c-pane>
    <c-pane><c-button cls="primary">primary</c-button></c-pane>
    <c-pane><c-button cls="warning">warning</c-button></c-pane>
    <c-pane><c-button><c-spinner size="xlarge"></c-spinner></c-button></c-pane>
    <c-pane><c-button><c-spinner></c-spinner>normal size</c-button></c-pane>
    <c-pane><c-button><c-spinner size="xsmall"></c-spinner></c-button></c-pane>
    <c-pane><c-button size="xlarge">xlarge</c-button></c-pane>
    <c-pane><c-button size="large">large</c-button></c-pane>
    <c-pane><c-button>default</c-button></c-pane>
    <c-pane><c-button size="small">small</c-button></c-pane>
    <c-pane><c-button size="xsmall">xsmall</c-button></c-pane>
    <c-pane><c-button disabled>default disabled</c-button></c-pane>
    <c-pane><c-button cls="primary" disabled>primary disabled</c-button></c-pane>
    <c-pane><c-button cls="warning" disabled>warning disabled</c-button></c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CButton from 'components/c-button'
import CSpinner from 'components/c-spinner'

export default {
  components: {
    CPane,
    CButton,
    CSpinner
  }
}
</script>
