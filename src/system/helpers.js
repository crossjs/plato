/**
 * 将路由转成带前缀的绝对路由
 * @method addPrefixToPath
 * @param  {string}        prefix 路由前缀
 * @param  {string}        path   路由
 */
export function addPrefixToPath (prefix, path) {
  return `/${prefix}/${path}`.replace(/\/+$/, '').replace(/\/\/+/g, '/') || '/'
}

/**
 * 向组件 options 注入数据
 * @method injectOptionsToComponent
 * @param  {component}  component   Vue 组件
 * @param  {object}     injection   待注入的数据
 * @return {component}              注入后的 Vue 组件
 */
export function injectOptionsToComponent (component, injection) {
  if (component) {
    const options = __DEV__ ? component._Ctor[0].options : component
    Object.assign(options, injection)
  }
  return component
}
