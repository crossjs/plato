<template>
  <transition name="fade">
    <div :class="['c-modal', cls]"
      v-show="show">
      <c-mask v-if="backdrop"
        @touchend.native.prevent="callback()"></c-mask>
      <transition name="slide-up">
        <div class="c-modal-content" v-show="show">
          <div class="c-modal-body"><slot></slot></div>
          <c-pane cls="c-modal-footer" v-if="_actions">
            <c-cell direction="row">
              <c-flex v-for="(action, key) in _actions">
                <c-button :cls="action.cls"
                  :type="action.type"
                  @click.native="callback(key)">{{action.label}}</c-button>
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
    cls: {
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
            cls: 'warning',
            type: 'submit'
          },
          cancel: {
            label: '取消',
            cls: 'default',
            type: 'button'
          }
        }
      }
    },
    callback: {
      type: Function,
      default () {}
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

  components: {
    CMask,
    CPane,
    CCell,
    CFlex,
    CButton
  }
}
</script>

<style src="styles/components/modal"></style>
