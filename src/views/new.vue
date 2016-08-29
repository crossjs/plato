<template>
  <div class="v-new">
    <c-loading v-show="faq_create_pending"></c-loading>
    <c-form className="c-form-expand"
      @submit.prevent="submit">
      <c-field :label="__(title.label)">
        <c-textfield className="c-field-value"
          :field="title.field"
          :validate="title.validate"
          :value="title.value"
          @mutate="title.value = arguments[0]"
          ></c-textfield>
          <c-validation :validation="$validation" field="title"></c-validation>
      </c-field>
      <c-field :label="__(content.label)">
        <c-multiline className="c-field-value"
          rows="10"
          :field="content.field"
          :validate="content.validate"
          :value="content.value"
          @mutate="content.value = arguments[0]"
          ></c-multiline>
          <c-validation :validation="$validation" field="content"></c-validation>
      </c-field>
      <c-cell>
        <c-button className="primary"
          :disabled="$validation.errors.length > 0"
          @click.native="submit">提交</c-button>
      </c-cell>
    </c-form>
  </div>
</template>

<script>
import CValidation from 'plato-components/c-validation'
import CPane from 'plato-components/c-pane'
import CCell from 'plato-components/c-cell'
import CFlex from 'plato-components/c-flex'
import CForm from 'plato-components/c-form'
import CField from 'plato-components/c-field'
import CTextfield from 'plato-components/c-textfield'
import CMultiline from 'plato-components/c-multiline'
import CLoading from 'plato-components/c-loading'
import CButton from 'plato-components/c-button'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      title: {
        field: 'title',
        label: 'views.new.title',
        value: '',
        validate: {
          required: {
            message: this.__('message.required', this.__('views.new.title'))
          },
          maxlength: {
            rule: 50,
            message: 'Limit to 50 chars'
          }
        }
      },
      content: {
        field: 'content',
        label: 'views.new.content',
        value: '',
        validate: {
          required: {
            message: this.__('message.required', this.__('views.new.content'))
          },
          maxlength: {
            rule: 500,
            message: 'Limit to 500 chars'
          }
        }
      }
    }
  },

  computed: mapGetters(['faq_create_pending', 'faq_create_finally']),

  methods: {
    ...mapActions(['addItem']),
    submit () {
      this.$validate().then(() => {
        this.addItem({
          title: this.title.value,
          content: this.content.value
        })
      })
    }
  },

  watch: {
    faq_create_finally (val) {
      if (val) {
        this.$router.push('/')
      }
    }
  },

  validator: {
    auto: true
  },

  components: {
    CValidation,
    CPane,
    CFlex,
    CForm,
    CField,
    CTextfield,
    CMultiline,
    CLoading,
    CCell,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
