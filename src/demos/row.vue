<template>
  <div class="d-row">
    <div style="margin: 1rem 0">
      <c-row>no cols</c-row>
    </div>
    <div style="margin: 1rem 0">
      <c-row>
        <div class="col">col</div>
        <div class="col">col</div>
      </c-row>
      <c-row>
        <div class="col col-1">col-1</div>
        <div class="col col-3">col-3</div>
      </c-row>
      <c-row>
        <div class="col col-3">col-3</div>
        <div class="col col-1">col-1</div>
      </c-row>
    </div>
    <div style="margin: 1rem 0">
      <c-row>
        <div class="col">col</div>
        <div class="col">col</div>
        <div class="col">col</div>
      </c-row>
      <c-row>
        <div class="col col-1">col-1</div>
        <div class="col col-2">col-2</div>
        <div class="col col-1">col-1</div>
      </c-row>
    </div>
    <div style="margin: 1rem 0">
      <c-row>four rows in group</c-row>
      <c-row>four rows in group</c-row>
      <c-row>four rows in group</c-row>
      <c-row>four rows in group</c-row>
    </div>
  </div>
</template>

<script>
import CRow from 'components/c-row'

export default {
  components: {
    CRow
  }
}
</script>

<style src="styles/demo"></style>
