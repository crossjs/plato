<template>
  <div class="center">
    <c-pane>
      <c-badge>1</c-badge>
      <c-badge>0</c-badge>
      <c-badge>2</c-badge>
      <c-badge>4</c-badge>
      <c-badge>1024</c-badge>
    </c-pane>
    <c-pane>
      <c-badge class="primary">primary</c-badge>
      <c-badge class="warning">warning</c-badge>
    </c-pane>
    <c-pane>
      <c-badge size="xlarge">xlarge</c-badge>
      <c-badge size="large">large</c-badge>
      <c-badge size="small">small</c-badge>
      <c-badge size="xsmall">xsmall</c-badge>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/core/pane'
import CBadge from 'components/core/badge'

export default {
  components: {
    CPane,
    CBadge
  }
}
</script>
