<template>
  <div class="v-create">
    <c-modal :show="show_modal"
      @submit="create"
      @cancel="show_modal = false">{{ __('views.create.confirm') }}</c-modal>
    <c-spinner v-show="faq_is_fetching"></c-spinner>
    <c-form class="c-form-expand"
      @submit.native.prevent="show_modal = true">
      <div>
        <c-row class="padding" :flex="false">
          <c-label>{{__(title.label)}}</c-label>
          <c-badge class="warning" size="small">
            {{$validation.errors.filter(function (error) { return error.field === 'title' }).map(function (error) { return error.message }).join(' ')}}
          </c-badge>
          <c-textfield
            field="title"
            :row="title.row"
            :validate="title.validate"
            :value="title.value"
            @change="title.value = $event"></c-textfield>
        </c-row>
        <c-row class="padding" :flex="false">
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
            @change="content.value = $event"></c-multiline>
        </c-row>
      </div>
      <c-pane>
        <c-button class="primary" type="submit"
          :disabled="$validation.errors.length > 0">{{ __('views.create.submit') }}</c-button>
      </c-pane>
    </c-form>
  </div>
</template>

<script>
import CModal from 'components/core/modal'
import CBadge from 'components/core/badge'
import CPane from 'components/core/pane'
import CForm from 'components/core/form'
import CRow from 'components/core/row'
import CLabel from 'components/core/label'
import CTextfield from 'components/core/textfield'
import CMultiline from 'components/core/multiline'
import CSpinner from 'components/core/spinner'
import CButton from 'components/core/button'
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
    ...mapActions(['faqPost']),
    create () {
      this.show_modal = false
      this.$validate().then(() => {
        this.faqPost({
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
