<template>
  <validator name="validation">
    <modal
      :show.sync="modal.show"
      :args.sync="modal.args"
      :title="modal.title"
      :body="modal.body"
      :callback="modal.callback"></modal>
    <ul class="c-form-errors"
      v-if="$validation.errors && $validation.modified">
      <li class="c-form-error"
        v-for="error in $validation.errors">
        {{error.message}}
      </li>
    </ul>
    <form class="c-form"
      :class="[cls]"
      @submit.prevent="_submit"
      autocomplete="off"
      novalidate>
      <list
        :state="state"
        :title="title"
        :columns="columns"
        :items="items"
        @mutate="_mutate"></list>
      <pane v-for="a in actions"
        v-show="state === $index">
        <flex v-for="action in a" transition="fade">
          <button class="button"
            :class="[action.cls || 'default']"
            :type="action.type || 'button'"
            :disabled="action.disabled || $validation.invalid"
            @click="_click($key, action)">{{action.label}}</button>
        </flex>
      </pane>
    </form>
  </validator>
</template>

<script>
import Modal from './c-modal'
import List from './c-list'
import Pane from './c-pane'
import Flex from './c-flex'
export default {
  props: {
    cls: {
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
        title: '',
        body: '',
        callback (key) {
          if (key === 'submit') {
            this.$parent.$emit(...this.$parent.args)
          }
        }
      }
    }
  },

  methods: {
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
        if (action.mutation(this) === false) {
          this.args = args
          return false
        }
      }
      this.$emit(...args)
    },
    _submit () {
      this.submit(this.$validation, this.payload)
    }
  },

  components: {
    Modal,
    List,
    Pane,
    Flex
  }
}
</script>

<style src="styles/components/form"></style>
