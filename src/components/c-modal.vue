<template>
  <div :class="['c-modal', class]"
    v-show="show"
    transition="fade">
    <c-mask v-show="backdrop && show"
      @touchend.prevent="show = false"
      transition="fade"></c-mask>
    <div class="c-modal-content"
      v-show="show"
      transition="slide-up">
      <div class="c-modal-body"><slot></slot></div>
      <c-pane class="c-modal-footer"
        v-if="actions">
        <c-flex-box>
          <c-flex-item v-for="action in actions">
            <c-button :class="action.class"
              :type="action.type"
              @click="_click($key)">{{action.label}}</c-button>
          </c-flex-item>
        </c-flex-box>
      </c-pane>
    </div>
  </div>
</template>

<script>
import CPane from './c-pane'
import CMask from './c-mask'
import CFlexBox from './c-flex-box'
import CFlexItem from './c-flex-item'
import CButton from './c-button'
export default {
  props: {
    show: {
      twoWay: true,
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    class: {
      type: String,
      default: ''
    },
    actions: {
      type: Object,
      default: () => {
        return {
          submit: {
            label: '确定',
            class: 'warning',
            type: 'submit'
          },
          cancel: {
            label: '取消',
            class: 'default',
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

  methods: {
    _click (key) {
      promisify(this.callback(key))
        .then(() => { this.show = false })
        .catch(() => { this.show = true })
    }
  },

  components: {
    CMask,
    CPane,
    CFlexBox,
    CFlexItem,
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

<style src="styles/components/modal"></style>
