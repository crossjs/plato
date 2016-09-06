/**
 * Simple Normalize
 */

const _options = {
  key (item) {
    return item.id
  },
  value (item) {
    return item
  }
}

export default function normalize (data = {}, options = {}) {
  options = { ..._options, ...options }
  const result = []
  const entities = {}
  data.forEach(item => {
    const key = options.key(item)
    const value = options.value(item)
    result.push(key)
    entities[key] = value
  })
  return {
    result,
    entities
  }
}
