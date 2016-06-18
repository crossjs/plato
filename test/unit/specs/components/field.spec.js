import Vue from 'vue'
import field from 'components/m-field'

describe('field', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should render correct contents', done => {
    Vue.component('comp', {
      mixins: [field],
      template: `<input
        :field="field"
        :attrs="_attrs"
        :validate="validate"
        v-model="value"
        @change="_validate">`
    })
    const data = {
      class: 'class',
      value: 'value',
      field: 'field',
      attrs: {},
      extra: {},
      validate: {
        required: {
          rule: true,
          message: 'required!'
        }
      }
    }
    const vm = new Vue({
      el,
      replace: false,
      template: `<comp
        :class="class"
        :value.sync="value"
        :field="field"
        :attrs="attrs"
        :extra="extra"
        :validate="validate"></comp>`,
      data
    })

    expect(vm.$children.length).to.equal(1)
    const comp = vm.$children[0]

    expect(comp.class).to.equal(data.class)
    expect(comp.value).to.equal(data.value)
    expect(comp.field).to.equal(data.field)
    expect(comp.attrs).to.equal(data.attrs)
    expect(comp.extra).to.equal(data.extra)
    expect(comp.validate).to.equal(data.validate)

    comp.$el.value = 'value2'
    triggerHTMLEvents(comp.$el, 'change')
    vm.$nextTick(() => {
      expect(vm.value).to.equal('value2')
      done()
    })
  })
})
