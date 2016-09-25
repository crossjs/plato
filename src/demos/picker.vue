<template>
  <div class="d-picker">
    <c-pane>
      <c-picker
        :index="index"
        @pick="pick">
        <p class="c-picker-item" v-for="item in items">{{item}}</p>
      </c-picker>
    </c-pane>
    <c-pane>
      <hr>
      <p>Picked: {{picked}}</p>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CPicker from 'components/c-picker'

export default {
  data () {
    return {
      items: ['Please select', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      index: 0
    }
  },

  computed: {
    picked () {
      return this.items[this.index]
    }
  },

  methods: {
    pick (index) {
      this.index = index
    }
  },

  components: {
    CPane,
    CPicker
  }
}
</script>

<style src="styles/demo"></style>
