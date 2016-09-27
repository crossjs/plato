<template>
  <transition name="fade">
    <div :class="['c-modal', cls]"
      v-show="show">
      <transition name="slide-up">
        <div class="c-modal-content" v-show="show">
          <div class="c-modal-body"><slot></slot></div>
          <c-row cls="c-modal-actions" v-if="_actions">
            <c-col cls="c-modal-action" v-for="(action, key) in _actions">
              <c-link :cls="['c-modal-link', action.cls]"
                @click.native="$emit(key)">{{action.label}}</c-link>
            </c-col>
          </c-row>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import CRow from './c-row'
import CCol from './c-col'
import CLink from './c-link'
import mBase from './mixins/base'

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
    CCol,
    CLink
  }
}
</script>

<style src="styles/components/modal"></style>
