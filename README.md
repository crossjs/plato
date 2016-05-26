# plato

> 开发中…… [Live demo](http://crossjs.com/plato)

![haojiyou](http://hbimg.b0.upaiyun.com/c0b233344592936874714e5596736eb92ae8d3309ff4-QFVcuc_fw658)

[![Travis](https://img.shields.io/travis/crossjs/plato.svg?style=flat-square)](https://github.com/crossjs/plato)
[![Coveralls](https://img.shields.io/coveralls/crossjs/plato.svg?style=flat-square)](https://github.com/crossjs/plato)
[![dependencies](https://david-dm.org/crossjs/plato.svg?style=flat-square)](https://david-dm.org/crossjs/plato)
[![devDependency Status](https://david-dm.org/crossjs/plato/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/plato#info=devDependencies)

> A plat<del>form</del> built with [koa](http://koajs.com/) and [vue](http://vuejs.org/)

## 预览

**带验证的登录表单、注册表单+确认框**

![带验证的登录表单](http://hbimg.b0.upaiyun.com/bd60a51cde4f9c1d1c18f9be7cd3a0448bd5ad6b7dd8-F87zFf_fw658)
![注册表单+确认框](http://hbimg.b0.upaiyun.com/be8d2c825a1fece77f5ff6d4e2d2e73c22db5a455547-LIVZgZ_fw658)

**可以行内编辑的分页列表、日期时间选择器**

![可以行内编辑的分页列表](http://hbimg.b0.upaiyun.com/9d17dc8f928499be2485d52cd27175958be7467291a2-d8cDno_fw658)
![日期时间选择器](http://hbimg.b0.upaiyun.com/9f63c694c1f0ca1ea58b1a8ad606dffee21ab61b9875-ZKByyx_fw658)

**切换表单状态：展示与编辑**

![展示](http://hbimg.b0.upaiyun.com/1bb18b8877928e3d15fdcd1c36236b1e94fe6a5b6776-YrqPk3_fw658)
![编辑](http://hbimg.b0.upaiyun.com/ba816e5efee6e936939e07b61392a45eee5fca8c6bf7-kzLp53_fw658)

## 技术栈

- koa
- vue (with vuex, vue-router)
- mongodb
- webpack
- postcss
- karma

## 设计原则

### 基本

- 使用 ES6 编写
- 向 vue@2 靠拢

### 数据

- 使用 [vuex](https://github.com/vuejs/vuex/) 进行数据管理
- 数据按模块分文件存放于 `src/vx/modules` 目录，并确保模块间数据不互相干扰
- 严格遵循单向数据流
- 组件间通过事件传递数据
  - 使用 $emit
  - 禁止使用 $dispatch 或 $broadcast，因为此特性在 vue@2 中不可用

``` js
// file: src/vx/store.js
import Vue from 'vue'
import Vuex from 'vuex-fsa'
import modules from './modules'
import middlewares from './middlewares'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  modules,
  middlewares
})
```

## 路由

- 使用 [vue-router](https://github.com/vuejs/vue-router/) 进行路由管理
- 路由按模块分文件存放于 `src/routes` 目录
- 配合 Webpack 实现 [动态载入](http://router.vuejs.org/zh-cn/lazy.html)

## 国际化

``` js
// use plugin
import Vue from 'vue'
import I18n from 'plugins/i18n'
Vue.use(I18n)

// set resources
export default {
  name: 'App',
  i18n: {
    resources: {
      message: {
        plato: '...'
      }
    }
  }
}
```

``` vuex
// use translate
// see: https://github.com/Matt-Esch/string-template
<template>
{{__('message.plato')}}
</template>
```

## UI 组件

**不限制使用何种 UI 组件，可以使用第三方，或自己开发（请尽量考虑复用性）**

*预置 UI 组件（`src/components`）最早设计用于后台开发，后来简单改造成移动端使用，还有很大优化空间*

- 使用 .vue [单文件组件](http://cn.vuejs.org/guide/application.html#单文件组件)
- 使用 mixins 实现复用
- 为了 **性能** 考虑，组件分为两类
  - duo 组件拥有两个状态：展示与编辑，集成了 validator
    - *计划优化 validator*
  - solo 组件仅展示

## 使用样式

- 使用 [postcss](http://postcss.org/) 拥抱未来
- 谨慎使用 [scoped css](http://vue-loader.vuejs.org/en/features/scoped-css.html)
  - 尤其不要在 scoped css 内使用 `@import`
- see files in `src/themes/default`

## 使用说明

``` bash
# 可选。启动 mongodb，体验前后端交互
mongod -dbpath <path/to/data/db>

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

# run e2e tests
npm run e2e

# run all tests, currently only run unit
npm test
```

## 兼容性

移动浏览器

## 相关

[vue-devtools](https://github.com/vuejs/vue-devtools)
