<template>
  <validator name="validation">
    <ul class="c-form-errors" v-if="$validation.errors && $validation.modified">
      <li class="c-form-error" v-for="error in $validation.errors">
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
        :items="fields"
        ></list>
      <pane>
        <button v-for="button in buttons"
          class="button"
          :class="[$key]"
          :type="button.type || 'button'"
          :disabled="button.disabled || $validation.invalid">{{button.label}}</button>
      </pane>
    </form>
  </validator>
</template>

<script>
import List from './c-list'
import Pane from './c-pane'
export default {
  props: {
    cls: {
      type: String,
      default: ''
    },
    submit: {
      type: Function,
      default: () => true
    },
    fields: {
      type: Object,
      default: () => {}
    },
    buttons: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      state: 1
    }
  },

  methods: {
    _submit () {
      if (this.$validation.valid) {
        this.submit(this.$validation, this._formdata())
      } else {
        this.submit(this.$validation)
      }
    },
    _formdata () {
      return Object.keys(this.fields).reduce((obj, key) => {
        obj[key] = this.fields[key].value
        return obj
      }, {})
    }
  },

  components: {
    List,
    Pane
  }
}
</script>

<style src="styles/components/form"></style>
