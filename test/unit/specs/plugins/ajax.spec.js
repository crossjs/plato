import Vue from 'vue'
import Ajax, { mutateOptions } from 'plugins/ajax'

Vue.use(Ajax)

describe('plugins/ajax', () => {
  let el
  before(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  after(() => {
    document.body.removeChild(el)
  })

  it('should have .$ajax and default options', () => {
    const vm = new Vue({
      el,
      replace: false,
      ajax: {}
    })

    expect(vm).to.have.property('$ajax')
    expect(vm).to.have.property('$GET')
    expect(vm).to.have.property('$POST')
    expect(vm).to.have.property('$DELETE')
    expect(vm).to.have.property('$PATCH')
    expect(vm).to.have.property('$PUT')

    const spy = sinon.spy(vm, '$ajax')

    expect(spy).callCount(0)
    vm.$GET('')
    expect(spy).callCount(1)
    expect(spy.args[0][0]).to.eql({
      url: '',
      method: 'GET'
    })
    vm.$POST('?')
    expect(spy.args[1][0]).to.eql({
      url: '?',
      method: 'POST'
    })
    expect(spy).callCount(2)
    vm.$DELETE('?')
    expect(spy.args[2][0]).to.eql({
      url: '?',
      method: 'DELETE'
    })
    vm.$PATCH({
      url: 'a',
      query: {
        x: 1
      }
    })
    expect(spy.args[3][0]).to.eql({
      url: 'a',
      query: {
        x: 1
      },
      method: 'PATCH'
    })
    vm.$PUT({
      url: 'a',
      body: {
        x: 1
      }
    })
    expect(spy.args[4][0]).to.eql({
      url: 'a',
      method: 'PUT',
      body: {
        x: 1
      }
    })
  })

  // it('should have defaults options', () => {
  //   const vm = new Vue({
  //     el,
  //     replace: false,
  //     ajax: {}
  //   })
  //
  //   expect(vm).to.have.property('$ajax')
  //   expect(vm).to.have.property('$GET')
  //   expect(vm).to.have.property('$POST')
  //   expect(vm).to.have.property('$DELETE')
  //   expect(vm).to.have.property('$PATCH')
  //   expect(vm).to.have.property('$PUT')
  // })
  //
  // it('should have .$ajax', () => {
  //   const comp = Vue.component('comp', {
  //     ajax:
  //   })
  //   const vm = new Vue({
  //     el,
  //     replace: false,
  //     ajax: {}
  //   })
  //
  //   expect(vm).to.have.property('$ajax')
  //   expect(vm).to.have.property('$GET')
  //   expect(vm).to.have.property('$POST')
  //   expect(vm).to.have.property('$DELETE')
  //   expect(vm).to.have.property('$PATCH')
  //   expect(vm).to.have.property('$PUT')
  // })
})
