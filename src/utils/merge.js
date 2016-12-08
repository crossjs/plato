import isPlainObj from 'lodash.isplainobject'

/**
 * 合并对象
 * 当一级属性是对象时执行合并，否则执行覆盖，例：
 *   merge({a: {b: 1}}, {a: {c: 1}}) => {a: {b: 1, c: 1}}
 *   merge({a: {b: { x: 1 }}}, {a: {b: { y: 2 }}}) => {a: {b: { y: 2 }}}
 * @method
 * @param  {Object} src  目标对象
 * @param  {Array}  args 待合入对象列表
 * @return {Object}      目标对象
 */
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
