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
    Vue.component('c-comp', {
      mixins: [field],
      template: `<input
        type="text"
        :field="field"
        :value="value"
        v-bind="attrs"
        @change="_change">`
    })
    const data = {
      cls: 'cls',
      value: 'value',
      field: 'field',
      attrs: {}
    }
    vm = new Vue({
      el,
      template: `<c-comp
        :cls="cls"
        :field="field"
        :value="value"
        :attrs="attrs"
        @change="_change"></c-comp>`,
      data,
      methods: {
        _change (val) {
          this.value = val
        }
      }
    })

    expect(vm.cls).to.equal(data.cls)
    expect(vm.value).to.equal(data.value)
    expect(vm.field).to.equal(data.field)
    expect(vm.attrs).to.equal(data.attrs)
    expect(vm.extra).to.equal(data.extra)
    expect(vm.validate).to.equal(data.validate)

    vm.$el.value = 'value2'
    triggerHTMLEvents(vm.$el, 'change')
    vm.$nextTick(() => {
      vm.$nextTick(() => {
        expect(vm.value).to.equal('value2')
        done()
      })
    })
  })
})
