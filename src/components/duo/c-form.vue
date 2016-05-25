<template>
  <modal
    :show.sync="modal.show"
    :title="modal.title"
    :body="modal.body"
    :callback="modal.callback"></modal>
  <pane>
    <ul class="c-form-errors"
      v-if="$validation && $validation.errors">
      <li class="c-form-error"
        v-for="error in $validation.errors">
        {{error.message}}
      </li>
    </ul>
    <form :class="['c-form', class]"
      @submit.prevent="_submit"
      autocomplete="off"
      novalidate>
      <group
        :state="state"
        :title="title"
        :columns="columns"
        :items="items"
        @mutate="_mutate"></group>
      <flex-box v-for="a in actions"
        v-show="state === $index">
        <flex-item v-for="action in a" transition="fade">
          <button :class="['button', action.class || 'default']"
            :type="action.type || 'button'"
            :disabled="_disabled(action)"
            @click="_click($key, action)">{{action.label}}</button>
        </flex-item>
      </flex-box>
    </form>
  </pane>
</template>

<script>
import Modal from '../solo/c-modal'
import Group from './c-group'
import Pane from '../solo/c-pane'
import FlexBox from '../solo/c-flex-box'
import FlexItem from '../solo/c-flex-item'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: ''
    },
    submit: {
      type: Function,
      default: () => true
    },
    columns: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Object,
      default: () => {}
    },
    actions: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      args: [],
      modal: {
        show: false,
        body: '请确认',
        callback (key) {
          if (key === 'submit') {
            // reset
            this.show = false
            this.body = ''
            // submit
            this.$parent._submit()
            this.$parent.$emit(...this.$parent.args)
          }
        }
      }
    }
  },

  methods: {
    _disabled (action) {
      return action.disabled ||
        (this.$validation && this.$validation.invalid)
    },
    _mutate (key, val) {
      if (val !== this.items[key]) {
        if (!this.payload) {
          this.payload = { ...this.items }
        }
        this.payload[key] = val
        this.$emit('mutate', this.payload)
      }
    },
    _click (key, action) {
      const args = ['action', key]
      if (action.mutation) {
        if (action.mutation(this, this.modal) === false) {
          this.args = args
          return false
        }
      }
      this.$emit(...args)
    },
    _submit () {
      if (!this.modal.show) {
        this.submit(this.payload)
      }
    }
  },

  components: {
    Modal,
    Group,
    Pane,
    FlexBox,
    FlexItem
  }
}
</script>

<style src="styles/components/form"></style>
