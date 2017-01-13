# 模块

**请务必认真详细地阅读全文**

一个模块一般实现一些较为独立的功能，比如 `user` 实现登录登出，`i18n` 实现国际化功能。

模块必须满足约束条件，以方便复用与维护。

## 模块应该是一个 `Function`

```js
export default function myModule () {
  // 逻辑...
}
```

## 模块可以接收三个参数

```js
/**
 * `context` 为全局 vm 对象，存储各模块的注册数据
 * `options` 为外部传入选项，一般用于配置 `scope` 与 `prefix`
 * `register` 用于注册资源与回调，回调会在所有模块的资源注册完成后执行
 */
// r
export default function myModule (context, options, register) {
  // register(data, callback)
  // data 与 callback 都是可选的
  register({
    // 下称“数据”...
  }, function myModuleCallback (context) {
    // 下称“回调”...
    // 此时的 context 会包含更多的值
  })

  // 支持异步操作，比如
  // setTimeout(() => {
  //   register(...)
  // }, 3000)
}
```

## 第三个参数省略时，系统会自动注册函数的返回值

```js
export default function myModule (context, options) {
  // 接受用以下三种方式返回的对象
  // return [data, callback]
  // return data
  // return callback
  return [{
    // 数据...
  }, function myModuleCallback (context) {
    // 回调...
  }]

  // 还支持返回 Promise 对象，比如
  // return Promise.all([ makeData, makeCallback ])
}
```

## 数据必须包含 `options`

```js
export default function myModule (context, options = {}) {
  // 将外部传入的配置项与默认配置项合并
  options = { scope: 'myModule', prefix: '/', ...options }

  return {
    // 将完整的配置项提交注册
    options
  }
}
```

## 数据可以包含 `store`、`routes`、`plugins`

```js
export default function myModule (context, options = {}) {
  // 将外部传入的配置项与默认配置项合并
  options = { scope: 'myModule', prefix: '/', ...options }

  return {
    // 创建模块需要的 Vuex Store
    store: createStore(...),
    // 创建模块需要的路由配置
    routes: createRoutes(...),
    // 创建模块需要的全局 Vuex 插件
    plugins: createPlugins(...),
    // 将完整的配置项提交注册
    options
  }
}
```
