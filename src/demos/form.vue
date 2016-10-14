<template>
  <div>
    <c-form>
      <c-row>
        <c-col>
          <c-checkbox
            :value="check1"
            @change="check1 = arguments[0]"></c-checkbox>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-checkbox
            :value="check2"
            @change="check2 = arguments[0]"></c-checkbox>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-password
            :value="value"
            @change="value = arguments[0]"></c-password>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-password
            :toggle="true"
            :value="value"
            @change="value = arguments[0]"></c-password>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-textfield
            :attrs="{placeholder: 'text'}"></c-textfield>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-multiline
            :attrs="{placeholder: 'textarea'}"></c-multiline>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-textfield
            type="email"
            :attrs="{placeholder: 'email'}"></c-textfield>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-textfield
            type="tel"
            :attrs="{placeholder: 'tel'}"></c-textfield>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-textfield
            type="url"
            :attrs="{placeholder: 'url'}"></c-textfield>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-textfield
            type="password"
            :attrs="{placeholder: 'password'}"></c-textfield>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-textfield
            type="number"
            :attrs="{placeholder: 'number'}"></c-textfield>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-textfield
            type="search"
            :attrs="{placeholder: 'search'}"></c-textfield>
        </c-col>
      </c-row>
    </c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import CRow from 'components/c-row'
import CCol from 'components/c-col'
import CCheckbox from 'components/c-checkbox'
import CPassword from 'components/c-password'
import CTextfield from 'components/c-textfield'
import CMultiline from 'components/c-multiline'

export default {
  data () {
    return {
      check1: true,
      check2: false,
      value: 'password'
    }
  },

  components: {
    CForm,
    CRow,
    CCol,
    CCheckbox,
    CPassword,
    CTextfield,
    CMultiline
  }
}
</script>
