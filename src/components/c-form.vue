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
          <template v-if="_type(field.type, ['multiline'])">
            <textarea class="ui-form-input"
              :rows="field.rows"
              :cols="field.cols"
              :field="field.name"
              :readonly="field.readonly"
              :disabled="field.disabled"
              :placeholder="field.placeholder"
              v-model="field.value"
              v-validate="field.validate"></textarea>
          </template>
          <template v-if="_type(field.type, ['select'])">
            <select class="ui-form-select"
              :multiple="field.multiple"
              :size="field.size"
              :field="field.name"
              :readonly="field.readonly"
              :disabled="field.disabled"
              :placeholder="field.placeholder"
              v-model="field.value"
              v-validate="field.validate">
              <option v-for="option in field.options"
                :value="option.value">{{option.text}}</option>
            </select>
          </template>
          <template v-if="_type(field.type)">
            <input class="ui-form-input"
              :type="field.type || text"
              :size="field.size"
              :field="field.name"
              :readonly="field.readonly"
              :disabled="field.disabled"
              :placeholder="field.placeholder"
              v-model="field.value"
              v-validate="field.validate">
          </template>
        </li>
      </ul>
      <div class="ui-form-buttons">
        <button v-for="button in buttons" class="ui-form-button button-form-{{button.role}}"
          :type="button.type" :disabled="_disabled(button.disabled)">{{_label(button.label)}}</button>
      </div>
    </form>
  </validator>
</template>

<script>
const TEXT_LIKE_TYPES = [
  '', 'text', 'password', 'datetime', 'number', 'email'
]
export default {
  props: ['cls', 'submit', 'fields', 'buttons'],

  methods: {
    _type (type, types = TEXT_LIKE_TYPES) {
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
  }
}
</script>

<style src="styles/components/form"></style>
