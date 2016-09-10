<template>
  <div>
    <c-form>
      <c-row>
        <c-password cls="col"
          :value="value"
          :attrs="{placeholder: 'password'}"
          @mutate="value = arguments[0]"></c-password>
      </c-row>
      <c-row>
        <c-textfield cls="col"
          :attrs="{placeholder: 'text'}"></c-textfield>
      </c-row>
      <c-row>
        <c-textfield cls="col"
          type="email"
          :attrs="{placeholder: 'email'}"></c-textfield>
      </c-row>
      <c-row>
        <c-textfield cls="col"
          type="tel"
          :attrs="{placeholder: 'tel'}"></c-textfield>
      </c-row>
      <c-row>
        <c-textfield cls="col"
          type="url"
          :attrs="{placeholder: 'url'}"></c-textfield>
      </c-row>
      <c-row>
        <c-textfield cls="col"
          type="password"
          :attrs="{placeholder: 'password'}"></c-textfield>
      </c-row>
      <c-row>
        <c-textfield cls="col"
          type="number"
          :attrs="{placeholder: 'number'}"></c-textfield>
      </c-row>
      <c-row>
        <c-textfield cls="col"
          type="search"
          :attrs="{placeholder: 'search'}"></c-textfield>
      </c-row>
      <c-row>
        <c-multiline cls="col"
          :attrs="{placeholder: 'textarea'}"></c-multiline>
      </c-row>
    </c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import CRow from 'components/c-row'
import CTextfield from 'components/c-textfield'
import CMultiline from 'components/c-multiline'
import CPassword from 'components/c-password'

export default {
  data () {
    return {
      value: 'password'
    }
  },

  components: {
    CForm,
    CRow,
    CTextfield,
    CMultiline,
    CPassword
  }
}
</script>
