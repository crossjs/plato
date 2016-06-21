# 使用 ajax

- 基于 request 封装的 vue 插件
- 在 vuex 的环境里，应尽量避免使用，参见 [`utils/request`](requst.md)

## 文件

`plugins/ajax`

## 依赖

[`utils/request`](requst.md)

## 用法

在 index.js 引入 Ajax 插件

``` js
import Vue from 'vue'
import Ajax from 'plugins/ajax'

// 使用插件
Vue.use(Ajax, {
  // 选项对象，可选
  // hooks: {
  // },
  // headers: {
  // }
})
```

在 vue 实例中使用 `$ajax` 方法

``` js
this.$ajax({ url, options })
```

更多可用的 RESTful 方法

- `$GET`
- `$POST`
- `$DELETE`
- `$PUT`
- `$PATCH`
