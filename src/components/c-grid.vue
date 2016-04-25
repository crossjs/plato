<template>
  <table class="ui-grid" :class="[cls]">
    <thead>
      <tr>
        <th v-for="column in columns" key="$key">{{column.label}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in data">
        <td v-for="column in columns">{{entry[$key] | _filter column.filters }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['cls', 'columns', 'data'],

  filters: {
    _filter (value, filters) {
      if (!filters) {
        return value
      }
      return Vue.filter(filters)(value)
    }
  }
}
</script>

<style src="styles/components/grid"></style>
