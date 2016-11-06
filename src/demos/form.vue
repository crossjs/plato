<template>
  <div>
    <c-form>
      <c-row class="padding" :flex="false">
        <c-checkbox
          :value="check1"
          @change="check1 = arguments[0]"></c-checkbox>
        <c-checkbox
          :value="check1"
          @change="check1 = arguments[0]"></c-checkbox>
      </c-row>
      <c-row class="padding right" :flex="false">
        <c-checkbox
          :value="check2"
          @change="check2 = arguments[0]"></c-checkbox>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield type="password" placeholder="password"
          @change="value = arguments[0]"></c-textfield>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-password
          :attrs="{placeholder: 'password'}"
          @change="value = arguments[0]"></c-password>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield placeholder="text"></c-textfield>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-multiline placeholder="textarea"></c-multiline>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield type="email" placeholder="email"></c-textfield>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield type="tel" placeholder="tel"></c-textfield>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield type="url" placeholder="url"></c-textfield>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield type="password" placeholder="password"></c-textfield>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield type="number" placeholder="number"></c-textfield>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield type="search" placeholder="search"></c-textfield>
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
