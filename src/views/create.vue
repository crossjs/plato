<template>
  <div class="v-create">
    <c-modal
      :show="show_modal"
      :callback="callback"
      @close="show_modal = false">{{ __('views.create.confirm') }}</c-modal>
    <c-loading v-show="faq_is_fetching"></c-loading>
    <c-form cls="c-form-expand"
      @submit.native.prevent="submit">
      <c-row :flex="false">
        <c-label>{{__(title.label)}}</c-label>
        <c-textfield
          field="title"
          :row="title.row"
          :validate="title.validate"
          :value="title.value"
          @mutate="title.value = arguments[0]"
          ></c-textfield>
          <c-validation :validation="$validation" field="title"></c-validation>
      </c-row>
      <c-row :flex="false">
        <c-label>{{__(content.label)}}</c-label>
        <c-multiline
          field="content"
          rows="10"
          :row="content.row"
          :validate="content.validate"
          :value="content.value"
          @mutate="content.value = arguments[0]"
          ></c-multiline>
          <c-validation :validation="$validation" field="content"></c-validation>
      </c-row>
      <c-pane>
        <c-button cls="primary" type="submit"
          :disabled="$validation.errors.length > 0">{{ __('views.create.submit') }}</c-button>
      </c-pane>
    </c-form>
  </div>
</template>

<script>
import CModal from 'components/c-modal'
import CValidation from 'components/c-validation'
import CPane from 'components/c-pane'
import CForm from 'components/c-form'
import CRow from 'components/c-row'
// import CIcon from 'components/c-icon'
import CLabel from 'components/c-label'
import CTextfield from 'components/c-textfield'
import CMultiline from 'components/c-multiline'
import CLoading from 'components/c-loading'
import CButton from 'components/c-button'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      show_modal: false,
      title: {
        row: 'title',
        label: 'views.create.title',
        value: '',
        validate: {
          required: {
            message: this.__('message.required', this.__('views.create.title'))
          },
          maxlength: {
            rule: 50,
            message: 'Limit to 50 chars'
          }
        }
      },
      content: {
        row: 'content',
        label: 'views.create.content',
        value: '',
        validate: {
          required: {
            message: this.__('message.required', this.__('views.create.content'))
          },
          maxlength: {
            rule: 500,
            message: 'Limit to 500 chars'
          }
        }
      }
    }
  },

  computed: mapGetters(['faq_is_fetching']),

  methods: {
    ...mapActions(['addItem']),
    submit () {
      this.show_modal = true
    },
    callback (key) {
      if (key === 'submit') {
        this.create()
      }
    },
    create () {
      this.$validate().then(() => {
        this.addItem({
          title: this.title.value,
          content: this.content.value
        })
      })
    }
  },

  watch: {
    faq_is_fetching (val) {
      if (!val) {
        this.$router.push('/')
      }
    }
  },

  validator: {
    auto: true
  },

  components: {
    CModal,
    CValidation,
    CForm,
    CRow,
    // CIcon,
    CLabel,
    CTextfield,
    CMultiline,
    CLoading,
    CPane,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
