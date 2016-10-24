<template>
  <div class="v-create">
    <c-modal :show="show_modal"
      @submit="create"
      @cancel="show_modal = false">{{ __('views.create.confirm') }}</c-modal>
    <c-spinner v-show="faq_is_fetching"></c-spinner>
    <c-form class="c-form-expand"
      @submit.native.prevent="show_modal = true">
      <c-row :flex="false">
        <c-label>{{__(title.label)}}</c-label>
        <c-badge class="warning" size="small">
          {{$validation.errors.filter(function (error) { return error.field === 'title' }).map(function (error) { return error.message }).join(' ')}}
        </c-badge>
        <c-textfield
          field="title"
          :row="title.row"
          :validate="title.validate"
          :value="title.value"
          @change="title.value = arguments[0]"></c-textfield>
      </c-row>
      <c-row :flex="false">
        <c-label>{{__(content.label)}}</c-label>
        <c-badge class="warning" size="small">
          {{$validation.errors.filter(function (error) { return error.field === 'content' }).map(function (error) { return error.message }).join(' ')}}
        </c-badge>
        <c-multiline
          field="content"
          rows="10"
          :row="content.row"
          :validate="content.validate"
          :value="content.value"
          @change="content.value = arguments[0]"></c-multiline>
      </c-row>
      <c-pane>
        <c-button class="primary" type="submit"
          :disabled="$validation.errors.length > 0">{{ __('views.create.submit') }}</c-button>
      </c-pane>
    </c-form>
  </div>
</template>

<script>
import CModal from 'components/c-modal'
import CBadge from 'components/c-badge'
import CPane from 'components/c-pane'
import CForm from 'components/c-form'
import CRow from 'components/c-row'
import CLabel from 'components/c-label'
import CTextfield from 'components/c-textfield'
import CMultiline from 'components/c-multiline'
import CSpinner from 'components/c-spinner'
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
    create () {
      this.show_modal = false
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
    CBadge,
    CForm,
    CRow,
    CLabel,
    CTextfield,
    CMultiline,
    CSpinner,
    CPane,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
