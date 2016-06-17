import Vue from 'vue'
import Promise from 'nd-promise'
import Ajax from 'plugins/ajax'

function before () {}

Vue.use(Ajax, {
  hooks: {
    before
  }
})

describe('plugins/ajax', () => {
  let el
  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should extend global options', () => {
    const vm = new Vue({
      el,
      replace: false,
      ajax: {
        hooks: {
          after
        }
      }
    })

    function after () {}

    expect(vm.$options.ajax.hooks.before).to.equal(before)
    expect(vm.$options.ajax.hooks.after).to.equal(after)
  })

  it('should NOT extend global options, while no ajax in $options', () => {
    const vm = new Vue({
      el,
      replace: false
    })

    expect(vm.$options.ajax).to.equal(undefined)
  })

  it('should call hooks', () => {
    const vm = new Vue({
      el,
      replace: false,
      ajax: {}
    })

    const spy = sinon.spy(vm.$options.ajax.hooks, 'before')

    expect(spy).callCount(0)
    vm.$GET('')
    expect(spy).callCount(1)
  })

  it('should extend parents\' options', () => {
    const comp = Vue.component('comp', {
      ajax: {
        hooks: {
          failure
        }
      }
    })
    const vm = new Vue({
      el,
      replace: false,
      ajax: {
        hooks: {
          after
        }
      },
      template: '<comp></comp>',
      components: {
        comp
      }
    })

    function failure () {}
    function after () {}

    expect(vm.$children[0].$options.ajax.hooks.before).to.equal(before)
    expect(vm.$children[0].$options.ajax.hooks.failure).to.equal(failure)
    expect(vm.$children[0].$options.ajax.hooks.after).to.equal(after)
  })

  // todo: fake server
  it('should mutate options', () => {
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

  it('should add query to url', () => {
    const vm = new Vue({
      el,
      replace: false,
      ajax: {}
    })

    vm.$GET({
      url: 'a',
      query: {
        x: 1
      },
      mutate (options) {
        expect(options.url).to.equal('a?x=1')
        return Promise.resolve(options)
      }
    })

    vm.$GET({
      url: 'a?x=1',
      query: {
        x: 1
      },
      mutate (options) {
        expect(options.url).to.equal('a?x=1&x=1')
        return Promise.resolve(options)
      }
    })
  })

  it('should replace url with params', () => {
    const vm = new Vue({
      el,
      replace: false,
      ajax: {}
    })

    vm.$GET({
      url: '{y}a{x}b{{x}}',
      params: {
        x: 1
      },
      mutate (options) {
        expect(options.url).to.equal('a1b{x}')
        return Promise.resolve(options)
      }
    })
  })
})
