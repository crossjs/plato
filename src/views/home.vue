<template>
  <pane class="demos">
    <group
      v-for="demo in demos"
      :title="demo.title"
      :columns="demo.columns"
      :items="demo.items"></group>
  </pane>
</template>

<script>
import Pane from 'solo/c-pane'
import Group from 'solo/c-group'
export default {
  data () {
    return {
      demos: [{
        title: 'demo',
        columns: {
          duo: {
            icon: 'iconfont-duo',
            label: 'duo',
            type: 'link'
          },
          solo: {
            icon: 'iconfont-solo',
            label: 'solo',
            type: 'link'
          },
          chart: {
            icon: 'iconfont-chart',
            label: 'chart',
            type: 'link'
          },
          misc: {
            icon: 'iconfont-misc',
            label: 'misc',
            type: 'link'
          }
        },
        items: {
          duo: {
            route: {
              name: 'demo/duo'
            },
            label: '一些双态组件'
          },
          solo: {
            route: {
              name: 'demo/solo'
            },
            label: '一些单态组件'
          },
          chart: {
            route: {
              name: 'demo/chart'
            },
            label: '一些图表'
          },
          misc: {
            route: {
              name: 'demo/misc'
            },
            label: '杂项'
          }
        }
      }]
    }
  },

  components: {
    Pane,
    Group
  }
}
</script>

<style src="styles/views/demos"></style>
