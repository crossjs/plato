<template>
  <div>
    <c-pane>
      <c-spinner size="xlarge"></c-spinner>
      <c-spinner size="large"></c-spinner>
      <c-spinner></c-spinner>
      <c-spinner size="small"></c-spinner>
      <c-spinner size="xsmall"></c-spinner>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CSpinner from 'components/c-spinner'

export default {
  components: {
    CPane,
    CSpinner
  }
}
</script>
