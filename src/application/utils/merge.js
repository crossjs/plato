import isPlainObj from 'lodash.isplainobject'

export default (src, ...args) => {
  args.forEach(arg => {
    Object.keys(arg).forEach(key => {
      if (isPlainObj(arg[key])) {
        if (!src.hasOwnProperty(key)) {
          src[key] = {}
        }
        Object.assign(src[key], arg[key])
      } else {
        src[key] = arg[key]
      }
    })
  })
  return src
}
