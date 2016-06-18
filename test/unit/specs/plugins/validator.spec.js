import Vue from 'vue'
import Validator from 'plugins/validator'

Vue.use(Validator)

describe('validator', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  describe('install', () => {
    describe('root components (own validator)', () => {
      it('should has $validation, $validate', () => {
        const vm = new Vue({
          el,
          replace: false,
          validator: {}
        })

        expect(vm).to.have.property('$validation')
        expect(vm).to.have.property('$validate')
      })

      it('should not validate while no validate in data', done => {
        const vm = new Vue({
          el,
          replace: false,
          validator: {
            auto: true
          }
        })

        vm.$nextTick(() => {
          const { errors, fields, valid, invalid } = vm.$validation
          expect(fields.length).to.equal(0)
          expect(valid).to.equal(true)
          expect(invalid).to.equal(false)
          expect(errors.length).to.equal(0)
          done()
        })
      })

      it('should not validate automatically', done => {
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
          validator: {
            auto: false
          }
        })

        const spy = sinon.spy(vm, '$validate')

        vm.$nextTick(() => {
          expect(spy).callCount(0)
          vm.$validate()
          expect(spy).callCount(1)
          vm.$validate()
          expect(spy).callCount(2)
          done()
        })
      })

      it('should validate itself', done => {
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
          validator: {
            auto: true
          }
        })

        vm.$nextTick(() => {
          expect(vm.$validation).to.eql({
            valid: false,
            invalid: true,
            fields: [vm],
            errors: [{
              // 因为 field 是 vm 上的，不是 input 上的
              field: undefined,
              rule: true,
              message: 'Required!'
            }]
          })
          done()
        })
      })
    })

    describe('child components', () => {
      it('should has $validation, $validate', () => {
        Vue.component('comp', {
          data () {
            return {
              validate: {
                required: {
                  rule: true,
                  message: 'Required!'
                }
              }
            }
          }
        })
        const vm = new Vue({
          el,
          replace: false,
          validator: {},
          template: '<comp></comp>'
        })

        expect(vm.$children[0]).to.have.property('$validation')
        expect(vm.$children[0]).to.have.property('$validate')
      })

      it('should has $validation, $validate 2', () => {
        Vue.component('comp', {})
        const vm = new Vue({
          el,
          replace: false,
          validator: {
            auto: true
          },
          template: '<comp></comp>'
        })

        expect(vm.$children[0]).to.have.property('$validation')
        expect(vm.$children[0]).to.have.property('$validate')
      })

      it('should validate successfully', done => {
        Vue.component('comp', {
          props: ['value'],
          data () {
            return {
              validate: {
                required: {
                  rule: true,
                  message: 'Required!'
                }
              }
            }
          }
        })
        const vm = new Vue({
          el,
          replace: false,
          validator: {
            auto: false
          },
          data: {
            value: 'hello'
          },
          template: '<comp :value="value"></comp>'
        })

        const child = vm.$children[0]
        const { $validation } = child
        expect($validation.valid).to.be.true
        vm.$validate()
        expect($validation.valid).to.be.true
        expect(child.value).to.equal('hello')
        vm.value = ''
        vm.$nextTick(() => {
          expect(child.value).to.equal('')
          child.$validate()
          expect($validation.valid).to.be.false
          done()
        })
      })
    })
  })

  describe('rules', () => {
    function valiate (options, values, cb) {
      const vm = new Vue({
        el,
        data: {
          validate: options
        },
        replace: false,
        validator: {}
      })
      vm.$nextTick(() => {
        values.forEach(([a, b]) => {
          vm.value = a
          vm.$validate()
          expect(vm.$validation.valid).to.be[b]
        })
        cb && cb()
      })
    }

    it('should validate required', done => {
      valiate({
        required: {
          rule: true,
          message: 'Error!'
        }
      }, [
        ['', false],
        [[], false],
        [[0], true],
        [[''], false],
        [true, true],
        [false, false],
        [{}, false],
        [{ x: 1 }, true],
        [null, false],
        [undefined, false]
      ], done)
    })

    it('should validate minlength', done => {
      valiate({
        minlength: {
          rule: 1,
          message: 'Error!'
        }
      }, [
        ['', false],
        ['ab', true],
        [[], false],
        [[0], true],
        [true, false],
        [false, false],
        [{}, false],
        [{ x: 1 }, false],
        [null, false],
        [undefined, false]
      ], done)
    })

    it('should validate maxlength', done => {
      valiate({
        maxlength: {
          rule: 1,
          message: 'Error!'
        }
      }, [
        ['', true],
        ['ab', false],
        [[], true],
        [[0, 1], false],
        [[''], true],
        [true, false],
        [false, false],
        [{}, false],
        [{ x: 1 }, false],
        [null, false],
        [undefined, false]
      ], done)
    })

    it('should validate min', done => {
      valiate({
        min: {
          rule: 1,
          message: 'Error!'
        }
      }, [
        ['', false],
        ['ab', false],
        [[], false],
        [[1], true],
        [[1, 2], false],
        [true, true],
        [false, false],
        [{}, false],
        [{ x: 1 }, false],
        [null, false],
        [undefined, false]
      ], done)
    })

    it('should validate max', done => {
      valiate({
        max: {
          rule: 1,
          message: 'Error!'
        }
      }, [
        ['', true],
        ['ab', false],
        [[], true],
        [[1], true],
        [[1, 2], false],
        [true, true],
        [false, true],
        [{}, false],
        [{ x: 1 }, false],
        [null, true],
        [undefined, false]
      ], done)
    })

    it('should validate pattern', done => {
      valiate({
        pattern: {
          rule: '/^\\d+$/',
          message: 'Error!'
        }
      }, [
        ['', false],
        ['0', true],
        ['01', true],
        ['01ab', false],
        ['ab', false],
        [[], false],
        [[1], true],
        [[1, 2], false],
        [true, false],
        [false, false],
        [{}, false],
        [{ x: 1 }, false],
        [null, false],
        [undefined, false]
      ], done)
    })

    it('should validate pattern (invalid pattern)', done => {
      valiate({
        pattern: {
          rule: /^\d$/,
          message: 'Error!'
        }
      }, [
        ['123', false]
      ], done)
    })

    it('should validate pattern (invalid pattern 2)', done => {
      valiate({
        pattern: {
          rule: '^\\d$',
          message: 'Error!'
        }
      }, [
        ['123', false]
      ], done)
    })

    it('should stop on error', done => {
      const vm = new Vue({
        el,
        data: {
          value: 'hello world!',
          validate: {
            pattern: {
              rule: '/^\\S+$/',
              message: 'pattern!'
            },
            maxlength: {
              rule: 8,
              message: 'maxlength!'
            }
          }
        },
        replace: false,
        validator: {
          auto: true
        }
      })

      vm.$nextTick(() => {
        expect(vm.$validation.errors[0].message).to.equal('pattern!')
        done()
      })
    })
  })
})
