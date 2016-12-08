<template>
  <div class="main">
    <div>
      <c-row>
        <p>no cols</p>
      </c-row>
    </div>
    <div>
      <c-row>
        <c-col>col</c-col>
        <c-col>col</c-col>
      </c-row>
      <c-row>
        <c-col :size="1">col-1</c-col>
        <c-col :size="3">col-3</c-col>
      </c-row>
      <c-row>
        <c-col :size="3">col-3</c-col>
        <c-col :size="1">col-1</c-col>
      </c-row>
    </div>
    <div>
      <c-row>
        <c-col>col</c-col>
        <c-col>col</c-col>
        <c-col>col</c-col>
      </c-row>
      <c-row>
        <c-col :size="1">col-1</c-col>
        <c-col :size="2">col-2</c-col>
        <c-col :size="1">col-1</c-col>
      </c-row>
    </div>
    <div>
      <c-row class="padding">four rows in group with padding</c-row>
      <c-row class="padding">four rows in group with padding</c-row>
      <c-row class="padding">four rows in group with padding</c-row>
      <c-row class="padding">four rows in group with padding</c-row>
    </div>
  </div>
</template>

<script>
import CRow from 'components/core/row'
import CCol from 'components/core/col'

export default {
  components: {
    CRow,
    CCol
  }
}
</script>

<style scoped>
.main {
  & > div {
    margin: 1rem 0;
  }

  & .c-col {
    box-sizing: border-box;
    border: 1px solid var(--primary);
  }
}
</style>
