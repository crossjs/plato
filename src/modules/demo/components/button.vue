<template>
  <div>
    <c-pane><c-button>default</c-button></c-pane>
    <c-pane><c-button class="primary">primary</c-button></c-pane>
    <c-pane><c-button class="warning">warning</c-button></c-pane>
    <c-pane><c-button><c-spinner size="xlarge"></c-spinner></c-button></c-pane>
    <c-pane><c-button><c-spinner></c-spinner>normal size</c-button></c-pane>
    <c-pane><c-button><c-spinner size="xsmall"></c-spinner></c-button></c-pane>
    <c-pane><c-button size="xlarge">xlarge</c-button></c-pane>
    <c-pane><c-button size="large">large</c-button></c-pane>
    <c-pane><c-button>default</c-button></c-pane>
    <c-pane><c-button size="small">small</c-button></c-pane>
    <c-pane><c-button size="xsmall">xsmall</c-button></c-pane>
    <c-pane><c-button disabled>default disabled</c-button></c-pane>
    <c-pane><c-button class="primary" disabled>primary disabled</c-button></c-pane>
    <c-pane><c-button class="warning" disabled>warning disabled</c-button></c-pane>
  </div>
</template>

<script>
import CPane from 'components/core/pane'
import CButton from 'components/core/button'
import CSpinner from 'components/core/spinner'

export default {
  components: {
    CPane,
    CButton,
    CSpinner
  }
}
</script>
