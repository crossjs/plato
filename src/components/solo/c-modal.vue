<template>
  <div :class="['c-modal', class]"
    v-show="show"
    transition="fade">
    <mask v-show="show"
      @touchend.prevent="show = false"
      transition="fade"></mask>
    <div class="c-modal-content"
      v-show="show"
      transition="slide-up">
      <div class="c-modal-body">{{body}}</div>
      <pane class="c-modal-footer"
        v-if="actions">
        <button v-for="action in actions"
          :class="['button', action.class || 'default']"
          :type="action.type || 'button'"
           @click="_click($key)">{{action.label}}</button>
      </pane>
    </div>
  </div>
</template>

<script>
import Pane from './c-pane'
import Mask from './c-mask'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: ''
    },
    body: {
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
    Mask,
    Pane
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
