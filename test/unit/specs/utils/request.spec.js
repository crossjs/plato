import request, { merge } from 'utils/request'

describe('request', () => {
  it('should add query to url', () => {
    request({
      url: 'a',
      query: {
        x: 1
      },
      mutate (options) {
        expect(options.url).to.equal('a?x=1')
        return Promise.resolve(options)
      }
    })

    request({
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
    request({
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

  it('should serialize body', () => {
    request({
      // method: 'POST',
      body: {
        x: 1
      },
      mutate (options) {
        expect(options.body).to.equal('{"x":1}')
        return Promise.resolve(options)
      }
    })
  })

  describe('merge', () => {
    it('should return source', () => {
      const src = {}
      expect(merge(src, { x: 1 })).to.equal(src)
    })

    it('should merge 1st level', () => {
      expect(merge({ a: { y: 1 } }, { a: { x: 1 } })).to.eql({ a: { x: 1, y: 1 } })
      expect(merge({ a: { y: 1 } }, { a: 1 })).to.eql({ a: 1 })
    })

    it('should NOT merge 2nd level', () => {
      expect(merge({ a: { x: { m: 1 } } }, { a: { x: { n: 1 } } })).to.eql({ a: { x: { n: 1 } } })
    })
  })
})
