<template>
  <div class="demos">
    <c-pane>
      <c-form
        :cells="cells"
        :items="{lang: env.lang}"
        @mutate="setEnv"></c-form>
    </c-pane>
    <c-pane class="quatation">
      {{__('message.plato')}}
    </c-pane>
    <c-pane>
      <c-group
        v-for="demo in demos"
        :title="demo.title"
        :cells="demo.cells"
        :items="demo.items"></c-group>
    </c-pane>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import CPane from 'components/c-pane'
import CGroup from 'components/c-group'
import { setEnv } from 'vx/actions'
export default {
  data () {
    return {
      cells: {
        lang: {
          label: '语言',
          type: 'dropdown',
          extra: {
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
        cells: [{
          icon: 'iconfont-form',
          label: 'form',
          type: 'link',
          value: {
            route: {
              name: 'demo/form'
            },
            label: '一些表单组件'
          }
        }, {
          icon: 'iconfont-chart',
          label: 'chart',
          type: 'link',
          value: {
            route: {
              name: 'demo/chart'
            },
            label: '一些图表'
          }
        }, {
          icon: 'iconfont-misc',
          label: 'misc',
          type: 'link',
          value: {
            route: {
              name: 'demo/misc'
            },
            label: '杂项'
          }
        }]
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
    CPane,
    CGroup
  }
}
</script>

<style src="styles/views/home"></style>
