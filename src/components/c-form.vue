<template>
  <validator name="validation">
    <form class="ui-form" :class="[cls]" v-on:submit.prevent="submit($validation)" autocomplete="off" novalidate>
      <ul class="ui-form-errors" v-if="$validation.modified">
        <li class="ui-form-error" v-for="error in $validation.errors">
          {{error.message}}
        </li>
      </ul>
      <ul class="ui-form-items">
        <li v-for="field in fields" class="ui-form-item" :class="{'ui-form-icon-item': field.icon}">
          <label class="ui-form-label" v-if="field.label">{{field.label}}</label>
          <span class="ui-form-icon iconfont iconfont-{{field.icon}}" v-if="field.icon"></span>
          <component
            :is="_component(field.type)"
            :state="state"
            :field="field.name"
            :value="field.value"
            :attrs="_extract(field)"
            :validate="field.validate"
            @mutate="_mutate($key, $arguments)"></component>
        </li>
      </ul>
      <div class="ui-form-buttons">
        <button v-for="button in buttons"
          class="button"
          :role="button.role"
          :type="button.type || 'button'"
          :disabled="_disabled(button.disabled)">{{_label(button.label)}}</button>
      </div>
    </form>
  </validator>
</template>

<script>
import Text from './c-text'
import Multiline from './c-multiline'
const TEXTLIKE_TYPES = [
  '', 'text', 'password', 'datetime', 'number', 'email'
]
export default {
  props: ['cls', 'submit', 'fields', 'buttons'],

  data () {
    return {
      state: 1
    }
  },

  methods: {
    _component (type, types = TEXTLIKE_TYPES) {
      if (types.indexOf(type)) {
        return 'text'
      }
      return type
    },
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
    _type (type, types = TEXTLIKE_TYPES) {
      return types.indexOf(type || '') !== -1
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
    Multiline
  },

  filters: {
    // todo: filter names
    _validate2attr (data) {
      return Object.keys(data).reduce((obj, key) => {
        obj[key] = data[key].rule
        return obj
      }, {})
    }
  }
}
</script>

<style src="styles/components/form"></style>
