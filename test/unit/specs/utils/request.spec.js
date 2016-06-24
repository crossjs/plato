import request from 'utils/request'

const headers = {
  'Content-Type': 'application/json'
}

describe('request', () => {
  // describe('misc', () => {
  //   it('Failed to fetch', done => {
  //     request({
  //       url: 'http://127.0.0.127/error'
  //     }).catch(err => {
  //       expect(err.message).to.equal('Failed to fetch')
  //       done()
  //     })
  //   })
  //   it('Request Error', done => {
  //     request({
  //       url: 'http://127.0.0.1/error'
  //     }).catch(err => {
  //       expect(err.message).to.equal('Request Error')
  //       done()
  //     })
  //   })
  // })

  describe('success', () => {
    beforeEach(() => {
      sinon.stub(window, 'fetch')
      window.fetch
        // .withArgs(...)
        .returns(Promise.resolve(new window.Response('{"hello":"world"}', {
          status: 200,
          headers
        })))
    })

    afterEach(() => {
      window.fetch.restore()
    })

    it('200', done => {
      request({
        url: ''
      }).then(json => {
        expect(json.hello).to.equal('world')
        done()
      })
    })
  })

  describe('failure', () => {
    beforeEach(() => {
      sinon.stub(window, 'fetch')
    })

    afterEach(() => {
      window.fetch.restore()
    })

    it('404', done => {
      window.fetch
        // .withArgs(...)
        .returns(Promise.resolve(new window.Response('Not Found', {
          status: 404,
          statusText: 'Not Found'
        })))
      request({
        url: ''
      }).catch(err => {
        expect(err).to.equal('Not Found')
        done()
      })
    })

    it('404 with json', done => {
      window.fetch
        // .withArgs(...)
        .returns(Promise.resolve(new window.Response('{"hello":"world"}', {
          status: 404,
          headers
        })))
      request({
        url: ''
      }).catch(err => {
        expect(err.hello).to.equal('world')
        done()
      })
    })

    it('403 with json', done => {
      window.fetch
        // .withArgs(...)
        .returns(Promise.resolve(new window.Response('{"hello":"world"}', {
          status: 403,
          headers
        })))
      request({
        url: ''
      }).catch(err => {
        expect(err.hello).to.equal('world')
        done()
      })
    })
  })

  describe('basic', () => {
    beforeEach(() => {
      sinon.stub(window, 'fetch')
      window.fetch
        // .withArgs(...)
        .returns(Promise.resolve(new window.Response('{"hello":"world"}', {
          status: 200,
          headers
        })))
    })

    afterEach(() => {
      window.fetch.restore()
    })

    it('should NOT ok', () => {
      expect(request()).to.equal(undefined)
      expect(request('a', 'b')).to.equal(undefined)
      expect(request(false)).to.equal(undefined)
    })

    it('should ok', done => {
      request('a').then(json => {
        expect(json.hello).to.equal('world')
        done()
      })
    })

    it('should translate arguments', () => {
      request('a', {
        mutate (options) {
          expect(options.url).to.equal('a')
          return Promise.resolve({})
        }
      })
    })

    it('should add query to url', () => {
      request({
        url: 'a',
        query: {
          x: 1
        },
        mutate (options) {
          expect(options.url).to.equal('a?x=1')
          return Promise.resolve({})
        }
      })

      request({
        url: 'a?x=1',
        query: {
          x: 1
        },
        mutate (options) {
          expect(options.url).to.equal('a?x=1&x=1')
          return Promise.resolve({})
        }
      })
    })

    it('should replace url with params', () => {
      request({
        url: '{y}a{x}b{{x}}',
        params: {
          x: 1
        },
        mutate (options) {
          expect(options.url).to.equal('a1b{x}')
          return Promise.resolve({})
        }
      })
    })

    it('should serialize body', () => {
      request({
        body: {
          x: 1
        },
        mutate (options) {
          expect(options.url).to.equal('?x=1')
          expect(options.body).to.equal(undefined)
          return Promise.resolve({})
        }
      })

      request({
        url: '?a=2',
        body: {
          x: 1
        },
        mutate (options) {
          expect(options.url).to.equal('?a=2&x=1')
          expect(options.body).to.equal(undefined)
          return Promise.resolve({})
        }
      })

      request({
        method: 'POST',
        body: {
          x: 1
        },
        mutate (options) {
          expect(options.body).to.equal('{"x":1}')
          return Promise.resolve({})
        }
      })
    })
  })
})
