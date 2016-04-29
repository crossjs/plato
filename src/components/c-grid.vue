<template>
  <table class="ui-grid" :class="[cls]">
    <thead>
      <tr>
        <th class="index">#</th>
        <th v-for="column in columns" :key="$key">{{column.label}}</th>
        <th v-if="actions"></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="entry in data" track-by="_id">
        <c-row
          :index="$index"
          :data="entry"
          :columns="columns"
          :actions="actions"
          :callback="callback"></c-row>
      </template>
    </tbody>
  </table>
</template>

<script>
import CRow from './c-grid/c-row'
export default {
  props: {
    cls: {
      type: String,
      default: ''
    },
    columns: {
      type: Object,
      default: {}
    },
    data: {
      type: Array,
      default: []
    },
    actions: {
      type: Array,
      default: []
    },
    callback: {
      type: Function,
      default: () => true
    }
  },

  components: {
    CRow
  }
}
</script>

<style src="styles/components/grid"></style>
