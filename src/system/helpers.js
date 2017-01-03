/**
 * 将路由转成带前缀的绝对路由
 * @method addPrefixToPath
 * @param  {array}        prefixes 路由前缀
 * @param  {string}       path    路由
 */
export function addPrefixToPath (prefixes, path) {
  // 首字母为`/`，则只取根 prefix
  const prefix = path.charAt(0) === '/' ? prefixes[0] : prefixes.join('/')
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
