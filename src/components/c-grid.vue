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
      <tr v-for="entry in data" track-by="_id">
        <td class="index">{{$index + 1}}</td>
        <td v-for="column in columns">{{entry[$key] | _filter column.filters }}</td>
        <td v-if="actions">
          <button v-for="action in actions"
            class="button"
            :role="action.role"
            :type="action.type || 'button'"
            @click="action.click(entry)">{{action.label}}</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['cls', 'columns', 'data', 'actions'],

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
