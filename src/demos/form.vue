<template>
  <div>
    <c-form>
      <c-row class="padding" :flex="false">
        <c-checkbox
          :value="check1"
          @change="changeCheck1"></c-checkbox>
        <c-checkbox
          :value="check1"
          @change="changeCheck1"></c-checkbox>
      </c-row>
      <c-row class="padding right" :flex="false">
        <c-checkbox
          :value="check2"
          @change="changeCheck2"></c-checkbox>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-textfield type="password" placeholder="password"
          @change="changeValue"></c-textfield>
      </c-row>
      <c-row class="padding" :flex="false">
        <c-password
          :attrs="{placeholder: 'password'}"
          @change="changeValue"></c-password>
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
import CForm from 'components/core/form'
import CRow from 'components/core/row'
import CCol from 'components/core/col'
import CCheckbox from 'components/core/checkbox'
import CPassword from 'components/core/password'
import CTextfield from 'components/core/textfield'
import CMultiline from 'components/core/multiline'

export default {
  data () {
    return {
      check1: true,
      check2: false,
      value: 'password'
    }
  },

  methods: {
    changeCheck1 (val) {
      this.check1 = val
    },
    changeCheck2 (val) {
      this.check2 = val
    },
    changeValue (val) {
      this.value = val
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
