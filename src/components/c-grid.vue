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
        <td v-for="column in columns">{{transformer(entry[$key], $key, entry)}}</td>
        <td v-if="actions">
          <button v-for="action in actions"
            class="button"
            :role="$key"
            :type="action.type || 'button'"
            @click="callback($key, entry)">{{action.label}}</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const noop = value => value
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
    transformer: {
      type: Function,
      default: noop
    },
    actions: {
      type: Object,
      default: []
    },
    callback: {
      type: Function,
      default: noop
    }
  }
}
</script>

<style src="styles/components/grid"></style>
