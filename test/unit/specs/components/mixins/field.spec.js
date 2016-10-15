import Vue from 'vue'
import field from 'components/mixins/field'

describe('field', () => {
  let el
  let vm

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    // document.body.removeChild(el)
    vm.$destroy()
  })

  it('should render correct contents', done => {
    const data = {
      value: 'value',
      field: 'field',
      extra: {},
      validate: {},
      attrs: {
        placeholder: 'placeholder'
      }
    }
    vm = new Vue({
      el,
      template: `<field-input
        :field="field"
        :value="value"
        :extra="extra"
        :validate="validate"
        :attrs="attrs"
        @change="onChange"></field-input>`, // emitted change
      data,
      methods: {
        onChange (val) {
          this.value = val
        }
      },
      components: {
        FieldInput: {
          mixins: [field],
          template: `<input
            type="text"
            :value="value"
            v-bind="attrs"
            @change="onChange">` // native change
        }
      }
    })

    const spy = sinon.spy(vm, '$validate')

    const child = vm.$children[0]
    const input = child.$el

    expect(input.value).to.equal(data.value)
    expect(input.placeholder).to.equal(data.attrs.placeholder)

    vm.$el.value = 'value2'
    triggerHTMLEvents(vm.$el, 'change')
    vm.$nextTick(() => {
      expect(vm.value).to.equal('value2')
      // there is no validator plugin, shoud NOT be called
      expect(spy).callCount(0)
      done()
    })
  })

  it('should watch value and call $validate', done => {
    const data = {
      value: 'value',
      field: 'field',
      extra: {},
      validate: {},
      attrs: {
        placeholder: 'placeholder'
      }
    }
    vm = new Vue({
      el,
      template: `<field-input
        :field="field"
        :value="value"
        :extra="extra"
        :validate="validate"
        :attrs="attrs"
        @change="onChange"></field-input>`, // emitted change
      data,
      methods: {
        onChange (val) {
          this.value = val
        }
      },
      components: {
        FieldInput: {
          mixins: [field],
          template: `<input
            type="text"
            :value="value"
            v-bind="attrs"
            @change="onChange">` // native change
        }
      }
    })

    const child = vm.$children[0]
    // fake validator
    child.$validate = function () {}
    const spy = sinon.spy(child, '$validate')

    vm.$el.value = 'value2'
    triggerHTMLEvents(vm.$el, 'change')
    vm.$nextTick(() => {
      expect(spy).callCount(1)
      done()
    })
  })
})
