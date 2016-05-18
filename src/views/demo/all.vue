<template>
  <div class="demos">
    <list
      v-for="demo in demos"
      :title="demo.title"
      :columns="demo.columns"
      :items="demo.items"></list>
  </div>
</template>

<script>
import List from 'solo/c-list'
export default {
  data () {
    return {
      demos: [{
        title: 'demo',
        columns: {
          duo: {
            label: 'duo',
            type: 'link'
          },
          solo: {
            label: 'solo',
            type: 'link'
          }
        },
        items: {
          duo: {
            route: {
              name: 'demo/duo'
            },
            label: '点我'
          },
          solo: {
            route: {
              name: 'demo/solo'
            },
            label: '别点他，点我'
          }
        }
      }]
    }
  },

  methods: {
    _toggle () {
      this.state = 2 + ~this.state
    }
  },

  components: {
    List
  }
}
</script>

<style src="styles/views/demos"></style>
