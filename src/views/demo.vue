<template>
  <div class="demos">
    <pane>
      <button class="button warning"
        type="button"
        @click="_toggle">切换状态</button>
    </pane>
    <list
      v-for="demo in demos"
      :state="state"
      :title="demo.title"
      :columns="demo.columns"
      :items="demo.items"></list>
  </div>
</template>

<script>
import List from 'components/c-list'
import Pane from 'components/c-pane'
import { ROLE_LEVEL_OPTIONS } from 'vx/constants'
export default {
  data () {
    return {
      state: 0,
      demos: [{
        title: 'Text',
        columns: {
          regular: {
            label: '默认',
            type: 'text'
          },
          readonly: {
            label: '只读',
            type: 'text',
            attrs: {
              readonly: true
            }
          }
        },
        items: {
          regular: '我很正常',
          readonly: '我有写保护'
        }
      }, {
        title: 'Dropdown',
        columns: {
          regular: {
            label: '默认',
            type: 'dropdown',
            attrs: {
              options: ROLE_LEVEL_OPTIONS
            }
          },
          readonly: {
            label: '只读',
            type: 'dropdown',
            attrs: {
              options: ROLE_LEVEL_OPTIONS,
              readonly: true
            }
          }
        },
        items: {
          regular: 2,
          readonly: 2
        }
      }, {
        title: 'Checkbox',
        columns: {
          regular: {
            label: '默认',
            type: 'checkbox'
          },
          readonly: {
            label: '只读',
            type: 'checkbox',
            attrs: {
              readonly: true
            }
          },
          customLabel: {
            label: '自定义 Label',
            type: 'checkbox',
            attrs: {
              'true-label': '正常',
              'false-label': '禁用'
            }
          },
          customValue: {
            label: '自定义 Value',
            type: 'checkbox',
            attrs: {
              'true-value': true,
              'false-value': false
            }
          }
        },
        items: {
          regular: false,
          readonly: true,
          customLabel: true,
          customValue: false
        }
      }, {
        title: 'Datetime',
        columns: {
          regular: {
            label: '默认',
            type: 'datetime'
          },
          readonly: {
            label: '只读',
            type: 'datetime',
            attrs: {
              readonly: true
            }
          },
          custom: {
            label: '自定义',
            type: 'datetime',
            attrs: {
              format: 'yyyy-MM-dd'
            }
          },
          custom2: {
            label: '自定义',
            type: 'datetime',
            attrs: {
              format: 'yyyy年MM月dd日'
            }
          }
        },
        items: {
          regular: Date.now(),
          readonly: Date.now(),
          custom: Date.now(),
          custom2: Date.now()
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
    List,
    Pane
  }
}
</script>

<style src="styles/views/demos"></style>
