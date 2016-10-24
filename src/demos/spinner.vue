<template>
  <div>
    <c-row>
      <c-spinner size="xlarge"></c-spinner>
      <c-spinner size="large"></c-spinner>
      <c-spinner></c-spinner>
      <c-spinner size="small"></c-spinner>
      <c-spinner size="xsmall"></c-spinner>
    </c-row>
  </div>
</template>

<script>
import CRow from 'components/c-row'
import CSpinner from 'components/c-spinner'

export default {
  components: {
    CRow,
    CSpinner
  }
}
</script>
