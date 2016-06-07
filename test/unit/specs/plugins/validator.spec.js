import Vue from 'vue'
import Validator from 'plugins/validator'

Vue.use(Validator)

describe('plugins/validator', () => {
  let el
  before(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  after(() => {
    document.body.removeChild(el)
  })

  it('should validate correctly', done => {
    const vm = new Vue({
      el,
      data: {
        value: '',
        validate: {
          required: {
            rule: true,
            message: 'Required!'
          }
        }
      },
      replace: false,
      template: '<input field="field1" :v-model="value" :validate="validate">',
      validator: {
        auto: true
      }
    })

    vm.$nextTick(() => {
      const { errors, fields, valid, invalid } = vm.$validation
      expect(fields[0]).to.equal(vm)
      expect(valid).to.equal(false)
      expect(invalid).to.equal(true)
      expect(errors[0]).to.eql({
        // 因为 field 是 vm 上的，不是 input 上的
        field: undefined,
        rule: true,
        message: 'Required!'
      })
      done()
    })
  })

  it('should not validate on init', done => {
    const vm = new Vue({
      el,
      data: {
        value: '',
        validate: {
          required: {
            rule: true,
            message: 'Required!'
          }
        }
      },
      replace: false,
      template: '<input field="field1" :v-model="value" :validate="validate">',
      validator: {
        auto: false
      }
    })

    vm.$nextTick(() => {
      const { errors, fields, valid, invalid } = vm.$validation
      expect(fields[0]).to.equal(vm)
      expect(valid).to.equal(true)
      expect(invalid).to.equal(false)
      expect(errors.length).to.equal(0)

      vm.$validate()
      vm.$nextTick(() => {
        const { errors, valid, invalid } = vm.$validation
        expect(valid).to.equal(false)
        expect(invalid).to.equal(true)
        expect(errors[0]).to.eql({
          // 因为 field 是 vm 上的，不是 input 上的
          field: undefined,
          rule: true,
          message: 'Required!'
        })
        done()
      })
    })
  })
})
