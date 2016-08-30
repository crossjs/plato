<template>
  <transition name="fade">
    <div :class="['c-modal', className]"
      v-show="show">
      <c-mask v-if="backdrop"
        @touchend.native.prevent="_click()"></c-mask>
      <transition name="slide-up">
        <div class="c-modal-content" v-show="show">
          <div class="c-modal-body"><slot></slot></div>
          <c-pane className="c-modal-footer" v-if="_actions">
            <c-cell direction="row">
              <c-flex v-for="(action, key) in _actions">
                <c-button :className="action.className"
                  :type="action.type"
                  @click.native="_click(key)">{{action.label}}</c-button>
              </c-flex>
            </c-cell>
          </c-pane>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import CPane from './c-pane'
import CMask from './c-mask'
import CCell from './c-cell'
import CFlex from './c-flex'
import CButton from './c-button'
export default {
  props: {
    className: {
      type: [String, Array],
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Object,
      default () {
        return {
          submit: {
            label: '确定',
            className: 'warning',
            type: 'submit'
          },
          cancel: {
            label: '取消',
            className: 'default',
            type: 'button'
          }
        }
      }
    },
    callback: {
      type: Function,
      default: () => Promise.resolve(true)
    }
  },

  computed: {
    _actions () {
      if (!this.actions || Object.keys(this.actions).length === 0) {
        return null
      }
      return this.actions
    }
  },

  methods: {
    _click (key) {
      promisify(this.callback(key))
        .then(() => { this.$emit('close') }, () => { /* this.$emit('hold') */ })
    }
  },

  components: {
    CMask,
    CPane,
    CCell,
    CFlex,
    CButton
  }
}

function promisify (val) {
  if (!val) {
    return val === false ? Promise.reject(val) : Promise.resolve(val)
  }

  if (typeof val.then === 'function') {
    return val
  }

  return Promise.resolve(val)
}
</script>

<style src="plato-styles/modal"></style>
