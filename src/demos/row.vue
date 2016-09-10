<template>
  <div>
    <div style="margin: 1rem 0">
      <c-row>one</c-row>
    </div>
    <div style="margin: 1rem 0">
      <c-row>
        <div class="col">two</div>
        <div class="col">two</div>
      </c-row>
      <c-row>
        <div class="col">two</div>
        <div class="col">two</div>
      </c-row>
    </div>
    <div style="margin: 1rem 0">
      <c-row>
        <div class="col">three</div>
        <div class="col">three three</div>
        <div class="col">three three three</div>
      </c-row>
      <c-row>
        <div class="col">three</div>
        <div class="col">three three</div>
        <div class="col">three</div>
      </c-row>
      <c-row>
        <div class="col">three</div>
        <div class="col">three</div>
        <div class="col">three</div>
      </c-row>
    </div>
    <div style="margin: 1rem 0">
      <c-row>four</c-row>
      <c-row>four</c-row>
      <c-row>four</c-row>
      <c-row>four</c-row>
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
