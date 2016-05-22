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

- duo 组件拥有两个状态：展示与编辑，集成了 validator
- solo 组件仅展示
- 基于 vuex 单向的数据流
- 组件间通过事件传递数据
- 使用 mixins 实现复用
- 向 vue@2 靠拢

## 阅读顺序

- src/vx: vuex 相关配置
- src/components: 一些通用的 UI 组件

## 使用说明

``` bash
# start mongo
mongod -dbpath path/to/data/db

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# serve with mocking
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

## 接口模拟

见 apis 目录

## 常见问题

- do NOT use `@import` in scoped css
- node@5.7.0 did NOT work for the `path.parse` issue

## 兼容性

移动浏览器
