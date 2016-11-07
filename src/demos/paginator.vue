<template>
  <div>
    <c-row class="padding">
      <c-paginator
        :query="{ $offset: 0, $limit: 2 }"
        :count="10"></c-paginator>
    </c-row>
    <c-row class="padding">
      <c-paginator
        :query="{ $offset: 4, $limit: 2 }"
        :count="10"></c-paginator>
    </c-row>
    <c-row class="padding">
      <c-paginator
        :query="{ $offset: 8, $limit: 2 }"
        :count="10"></c-paginator>
    </c-row>
    <c-row class="padding">
      <c-paginator
        :query="{ $offset: 10, $limit: 2 }"
        :count="10"></c-paginator>
    </c-row>
    <c-row class="padding">
      <c-paginator
        :query="{ $offset: 6, $limit: 2 }"
        :count="20"></c-paginator>
    </c-row>
    <c-row class="padding">
      <c-paginator
        :query="{ $offset: 16, $limit: 2 }"
        :count="20"></c-paginator>
    </c-row>
    <c-row class="padding">
      <c-paginator
        :query="{ $offset: 16, $limit: 2 }"
        :count="40"></c-paginator>
    </c-row>
    <c-row class="padding">
      <c-paginator
        :query="{ $offset: 26, $limit: 2 }"
        :count="40"></c-paginator>
    </c-row>
  </div>
</template>

<script>
import CRow from 'components/core/row'
import CCol from 'components/core/col'
import CPaginator from 'components/paginator'

export default {
  components: {
    CRow,
    CCol,
    CPaginator
  }
}
</script>
