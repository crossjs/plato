<template>
  <div class="v-new">
    <c-form className="c-form-expand">
      <c-form-cell label="Title">
        <c-textfield className="c-form-cell-value"></c-textfield>
      </c-form-cell>
      <c-form-cell label="Content">
        <c-multiline className="c-form-cell-value"></c-multiline>
      </c-form-cell>
    </c-form>
    <c-cell direction="row">
      <c-flex>
        <c-button className="primary" @click.native="submit">提交</c-button>
      </c-flex>
      <c-flex>
        <c-button @click.native="cancel">取消</c-button>
      </c-flex>
    </c-cell>
  </div>
</template>

<script>
import CPane from 'plato-components/c-pane'
import CCell from 'plato-components/c-cell'
import CFlex from 'plato-components/c-flex'
import CForm from 'plato-components/c-form'
import CFormCell from 'plato-components/c-form-cell'
import CTextfield from 'plato-components/c-textfield'
import CMultiline from 'plato-components/c-multiline'
import CLoading from 'plato-components/c-loading'
import CButton from 'plato-components/c-button'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['items']),

  methods: {
    ...mapActions(['getItems', 'addItem', 'deleteItem']),
    add () {
      this.addItem({
        title: 'first question',
        content: 'no answers yet'
      })
    }
  },

  created () {
    this.getItems()
  },

  components: {
    CPane,
    CFlex,
    CForm,
    CFormCell,
    CTextfield,
    CMultiline,
    CLoading,
    CCell,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
