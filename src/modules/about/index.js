import createRoutes from './create-routes'

// 方法 1：直接 return 需要注册的资源
export default (context, options = {}) => {
  options = { scope: 'about', prefix: 'about', ...options }

  // only data
  return {
    routes: createRoutes(context, options),
    options
  }
}

// 方法 2：通过 register 回调
// export default (context, options = {}, register) => {
//   options = { scope: 'about', prefix: '/', ...options }
//
//   register({
//     routes: createRoutes(context, options),
//     options
//   })
// }
