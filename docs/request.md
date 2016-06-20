# 使用 request

简单的 [fetch](https://github.com/github/fetch) 封装

## 文件

`utils/request`

## 用法

``` js
import request from 'utils/request'

request({
  method: 'GET', // 默认
  url: 'https://api.github.com/repos/{user}/{repo}/commits',
  params: {
    user: 'crossjs',
    repo: 'plato'
  },
  query: {
    per_page: 3
  }
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  },
  // 各请求阶段回调
  hooks: {
    before,
    success,
    failure,
    after
  }
})
```

使用 `mutate`

``` js

request({
  ...,
  // 修改 options 对象，以 Promise 对象返回
  mutate (options) {
    // 做些事情
    // 比如计算 Authorization
    return Promise.resolve(options)
  }
})
```
