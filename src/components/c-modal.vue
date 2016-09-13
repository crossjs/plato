<template>
  <transition name="fade">
    <div :class="['c-modal', cls]"
      v-show="show">
      <c-mask v-if="backdrop"
        @touchend.native.prevent="callback()"></c-mask>
      <transition name="slide-up">
        <div class="content" v-show="show">
          <div class="header"><slot name="title"></slot></div>
          <div class="body"><slot></slot></div>
          <div class="footer" v-if="_actions">
            <c-row>
              <c-link :cls="[action.cls, 'col']" v-for="(action, key) in _actions"
                @click.native="callback(key)">{{action.label}}</c-link>
            </c-row>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import CMask from './c-mask'
import CRow from './c-row'
import CLink from './c-link'

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
          cancel: {
            label: 'Cancel',
            cls: 'primary'
          },
          submit: {
            label: 'Submit',
            cls: 'primary'
          }
        }
      }
    },
    callback: {
      type: Function,
      default () {
        return true
      }
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
    CRow,
    CLink
  }
}
</script>

<style src="styles/components/modal"></style>
