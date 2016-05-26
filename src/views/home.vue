<template>
  <div class="demos">
    <c-form
      :columns="columns"
      :items="{lang: env.lang}"
      @mutate="setEnv"></c-form>
    <pane class="quatation">
      {{__('message.plato')}}
    </pane>
    <pane>
      <group
        v-for="demo in demos"
        :title="demo.title"
        :columns="demo.columns"
        :items="demo.items"></group>
    </pane>
  </div>
</template>

<script>
import CForm from 'duo/c-form'
import Pane from 'solo/c-pane'
import Group from 'solo/c-group'
import { setEnv } from 'vx/actions'
export default {
  data () {
    return {
      columns: {
        lang: {
          label: '语言',
          type: 'dropdown',
          attrs: {
            options: [{
              value: 'en',
              label: 'English'
            }, {
              value: 'zh',
              label: '中文'
            }]
          }
        }
      },
      demos: [{
        title: '示例',
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

  vuex: {
    actions: {
      setEnv
    }
  },

  components: {
    CForm,
    Pane,
    Group
  }
}
</script>

<style src="styles/views/home"></style>
