<template>
  <div>
    <c-row><c-loading size="xlarge"><div>xlarge</div></c-loading></c-row>
    <c-row><c-loading size="large"><div>large</div></c-loading></c-row>
    <c-row>
      <c-loading cls="col">default</c-loading>
      <c-loading cls="col">default</c-loading>
      <c-loading cls="col">default</c-loading>
    </c-row>
    <c-row><c-loading size="small"><div>small</div></c-loading></c-row>
    <c-row><c-loading size="xsmall"><div>xsmall</div></c-loading></c-row>
  </div>
</template>

<script>
import CRow from 'components/c-row'
import CLoading from 'components/c-loading'

export default {
  components: {
    CRow,
    CLoading
  }
}
</script>
