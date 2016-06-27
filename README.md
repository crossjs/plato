# PLATO :construction:

> :heart: a Boilerplate for SPAs use vue, [vuex-fsa](https://www.npmjs.com/package/vuex-fsa), vue-router

[Online Demo](http://crossjs.com/plato), [Documentation](http://crossjs.com/plato/#!/docs)

[![Travis](https://img.shields.io/travis/crossjs/plato.svg?style=flat-square)](https://travis-ci.org/crossjs/plato)
[![Coveralls](https://img.shields.io/coveralls/crossjs/plato.svg?style=flat-square)](https://coveralls.io/github/crossjs/plato)
[![dependencies](https://david-dm.org/crossjs/plato.svg?style=flat-square)](https://david-dm.org/crossjs/plato)
[![devDependency Status](https://david-dm.org/crossjs/plato/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/plato#info=devDependencies)

- :white_check_mark: Plugins like vuex, i18n, validator and ajax are almost ready, could be used in production amusedly.
- :negative_squared_cross_mark: UI components are NOT stable, could be changed anytime.

## Change Log

- 20160625
  - 增加阿拉伯语演示
- 20160624
  - 演示网站增加文档页面
  - c-textfield 支持自定义 type
  - m-field 移除 `_attrs`，validate 不再合入 `attrs`
  - m-field 增加 align 属性
- 20160623
  - 移除 vx/utils
  - 移除 request 的 hooks
  - 优化 request 的错误处理
  - progress、toasts 移到 vx/middlewares 中处理
  - 升级 vuex-promise
- 20160622
  - :construction: 简化 i18n 使用
  - 为保证数据都在 vuex 管理，默认不启用 plugins/ajax
  - 移除 c-value
  - 优化 c-modal
  - 增加 action sheet 演示（基于 c-modal）
- 20160620
  - 移除 `<router-view>` 中的 `transition-mode` [#5](https://github.com/crossjs/plato/issues/5)
- 20160619
  - 使用 icomoon 管理图标字体，因为 iconfont 不支持连体字符

## Dependencies

- vue
  - vue-router
  - plato-i18n
  - plato-validator
- vuex-fsa
  - vuex-promise
  - vuex-localstorage
- plato-request
- postCSS
- webpack
- karma
  - mocha
  - sinon
- eslint

## Principles

- 使用 ES6 编写
- 使用 .vue 单文件组件
  - 逻辑尽量写在 script 里，保持 template 逻辑简单
- 向 vue@2 靠拢
- **不限制使用何种 UI 组件，可以使用第三方，或自己开发（请尽量考虑复用性）**
- 尽量使用小的依赖库

## Troubleshooting

- Nodemon has error with node@6.x, so please use node@5.12.0

## Usage

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# serve with mocking. see mocks in /apis
npm run dev:mock

# clean
npm run clean

# build for production with minification
npm run compile

# run server in production
npm start

# run unit tests
npm run unit

# run lint and unit
npm test
```

## Backend

使用 koa@2 实现开发调试服务

若要寻找“完整”的后端，请访问分支 [backend](https://github.com/crossjs/plato/tree/backend)

## Appendix

- [vue-devtools](https://github.com/vuejs/vue-devtools)
- [awesome-vue](https://github.com/vuejs/awesome-vue)
