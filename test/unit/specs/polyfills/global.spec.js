import _global from 'polyfills/_global'

describe('global', () => {
  it('should return global', () => {
    assert(_global === global)
  })
})
