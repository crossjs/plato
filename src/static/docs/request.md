## Request

简单的 [fetch](https://github.com/github/fetch) 封装

### 文件

`utils/request`

### 用法

#### 常规用法

``` js
import request from 'utils/request'

request({
  method: 'GET', // 默认
  url: 'https://.../{user}/{repo}/commits',
  params: {
    user: 'crossjs',
    repo: 'plato'
  },
  query: {
    per_page: 3
  }
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
})
```

#### 使用 `mutate`

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

#### 在 action 里使用

*在 vuex 环境下，应统一采用这个模式，即数据请求只出现在 action 里*

``` js
// define action
import { GET_COMMITS } from '../types'
import request from 'utils/request'

export default {
  getCommits ({ dispatch }, payload) {
    dispatch(GET_COMMITS, request(payload))
  }
}

// call action, in components
this.getCommits({
  url: 'https://.../commits?per_page=3&sha=',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
})
```
