import Vue from 'vue'
import Promise from 'nd-promise'
import Ajax from 'plugins/ajax'

Vue.use(Ajax, {
  headers: {
    'Accept-Language': 'en'
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
        headers: {
          'Content-Type': 'text'
        }
      }
    })

    expect(vm.$options.ajax.headers['Content-Type']).to.equal('text')
    expect(vm.$options.ajax.headers['Accept-Language']).to.equal('en')
  })

  it('should NOT extend global options, while no ajax in $options', () => {
    const vm = new Vue({
      el,
      replace: false
    })

    expect(vm.$options.ajax).to.equal(undefined)
  })

  it('should extend parents\' options', () => {
    Vue.component('comp', {
      ajax: {
        headers: {
          'Accept': 'json'
        }
      }
    })
    const vm = new Vue({
      el,
      replace: false,
      ajax: {
        headers: {
          'Content-Type': 'text'
        }
      },
      template: '<comp></comp>'
    })

    expect(vm.$children[0].$options.ajax.headers['Accept-Language']).to.equal('en')
    expect(vm.$children[0].$options.ajax.headers['Content-Type']).to.equal('text')
    expect(vm.$children[0].$options.ajax.headers['Accept']).to.equal('json')
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
