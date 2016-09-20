<template>
  <transition name="fade">
    <div :class="['c-modal', cls]"
      v-show="show">
      <transition name="slide-up">
        <div class="c-modal-content" v-show="show">
          <div class="c-modal-body"><slot></slot></div>
          <c-row cls="c-modal-actions" v-if="_actions">
            <c-link :class="['c-modal-link', 'col', action.cls]" v-for="(action, key) in _actions"
              @click.native="$emit(key)">{{action.label}}</c-link>
          </c-row>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import mBase from './mixins/base'
import CRow from './c-row'
import CLink from './c-link'

export default {
  mixins: [mBase],
  props: {
    show: {
      type: Boolean,
      default: false
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
    CRow,
    CLink
  }
}
</script>

<style src="styles/components/modal"></style>
