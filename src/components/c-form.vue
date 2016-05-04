<template>
  <validator name="validation">
    <form class="c-form" :class="[cls]" v-on:submit.prevent="submit($validation)" autocomplete="off" novalidate>
      <ul class="c-form-errors" v-if="$validation.modified">
        <li class="c-form-error" v-for="error in $validation.errors">
          {{error.message}}
        </li>
      </ul>
      <ul class="c-form-items">
        <li v-for="field in fields" class="c-form-item" :class="{'ui-form-icon-item': field.icon}">
          <label class="c-form-label" v-if="field.label">{{field.label}}</label>
          <span class="c-form-icon iconfont iconfont-{{field.icon}}" v-if="field.icon"></span>
          <component
            :is="field.type"
            :state="state"
            :field="$key"
            :value.sync="field.value"
            :attrs="_extract(field)"
            :validate="field.validate"></component>
        </li>
      </ul>
      <div class="c-form-buttons">
        <button v-for="button in buttons"
          class="button"
          :role="$key"
          :type="button.type || 'button'"
          :disabled="_disabled(button.disabled)">{{_label(button.label)}}</button>
      </div>
    </form>
  </validator>
</template>

<script>
import Text from './c-text'
import Password from './c-password'
import Textarea from './c-textarea'
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
      default: {}
    },
    buttons: {
      type: Object,
      default: {}
    }
  },

  data () {
    return {
      state: 1
    }
  },

  methods: {
    _extract (field) {
      const attrs = {}
      if (field.attrs) {
        Object.keys(field.attrs).forEach(key => {
          attrs[key] = field.attrs[key]
        })
      }
      if (field.validate) {
        Object.keys(field.validate).forEach(key => {
          attrs[key] = field.validate[key].rule
        })
      }
      return attrs
    },
    _label (label) {
      if (typeof label === 'function') {
        return label(this.$validation)
      }
      return label
    },
    _disabled (disabled) {
      if (typeof disabled === 'function') {
        return disabled(this.$validation)
      }
      return !!disabled
    }
  },

  components: {
    Text,
    Password,
    Textarea
  }
}
</script>

<style src="styles/components/form"></style>
