# plato

> 开发中……

![haojiyou](http://hbimg.b0.upaiyun.com/c0b233344592936874714e5596736eb92ae8d3309ff4-QFVcuc_fw658)

[![Travis](https://img.shields.io/travis/crossjs/plato.svg?style=flat-square)](https://github.com/crossjs/plato)
[![Coveralls](https://img.shields.io/coveralls/crossjs/plato.svg?style=flat-square)](https://github.com/crossjs/plato)
[![dependencies](https://david-dm.org/crossjs/plato.svg?style=flat-square)](https://david-dm.org/crossjs/plato)
[![devDependency Status](https://david-dm.org/crossjs/plato/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/plato#info=devDependencies)

> A plat<del>form</del> built with [koa](http://koajs.com/) and [vue](http://vuejs.org/)

## 预览

** 登录 **

![登录](http://hbimg.b0.upaiyun.com/31170a5d7dc67feecebed4709823cd5c415d7eba53ae-uA9uCz_fw554)

** 列表（可编辑） **

![列表](http://hbimg.b0.upaiyun.com/1525d851854ffad81b7718fc9de940df219447909663-JshDPh_fw658)

** 展示与编辑（可切换） **

![展示](http://hbimg.b0.upaiyun.com/ebb39b86beaa09d0d954e9feac9fa34593e0f2c66501-QsBGNS_fw658)
![编辑](http://hbimg.b0.upaiyun.com/91d37d633286ad29c65208bfb2dc1b1f34b0f2436bba-EFMrTx_fw658)

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
