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
      <c-title>最新提交</c-title>
      <c-loading v-show="!commits"></c-loading>
      <c-cell v-for="record in commits" transition="fade">
        <a :href="record.html_url" target="_blank" class="commit">{{record.commit.message}}</a><br>
        at <span class="date">{{record.commit.author.date | datetime 'yyyy-MM-dd hh:mm'}}</span>
      </c-cell>
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
import datetime from 'nd-datetime'
import CForm from 'components/c-form'
import CPane from 'components/c-pane'
import CGroup from 'components/c-group'
import CTitle from 'components/c-title'
import CLoading from 'components/c-loading'
import CCell from 'components/c-cell'
import { setEnv } from 'vx/actions'
export default {
  data () {
    const { router } = this.$route
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
            }, {
              value: 'none',
              label: '不存在的语言'
            }]
          }
        }
      },
      demos: [{
        title: '示例',
        cells: [{
          label: 'form',
          value: '一些表单组件',
          click () {
            router.go('demo/form')
          },
          extra: {
            isLink: true
          }
        }, {
          icon: 0xe605,
          label: 'chart',
          value: '一些图表',
          click () {
            router.go('demo/chart')
          },
          extra: {
            isLink: true
          }
        }, {
          value: '<i>杂七杂八</i>',
          click () {
            router.go('demo/misc')
          },
          extra: {
            isLink: true,
            isHTML: true
          }
        }]
      }, {
        title: '关于',
        cells: [{
          icon: 0xe60f,
          label: 'Fork',
          value: 'github.com/crossjs/plato',
          click () {
            window.open('https://github.com/crossjs/plato')
          }
        }, {
          icon: 0xe604,
          label: 'Author',
          value: 'github.com/crossjs',
          click () {
            window.open('https://github.com/crossjs')
          }
        }]
      }],
      commits: null
    }
  },

  ajax: {
    // without `root: true`, will inherit parents' options
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  },

  ready () {
    this.$GET('https://api.github.com/repos/crossjs/plato/commits?per_page=3&sha=')
    .then(res => {
      this.commits = res
    })
  },

  vuex: {
    actions: {
      setEnv
    }
  },

  filters: {
    datetime
  },

  components: {
    CForm,
    CPane,
    CGroup,
    CTitle,
    CLoading,
    CCell
  }
}
</script>

<style src="styles/views/home"></style>
