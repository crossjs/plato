# plat

> A plat<del>form</del> built with koa and vue

## 技术栈

- koa
- vue (with vuex, vue-router)
- mongodb
- webpack
- postcss
- karma

## 设计原则

- 单向数据流
- 组件间通过事件传递数据
- 使用 mixins 实现“继承”

## 使用说明

``` bash
# start mongo
mongod --dbpath path/to/data/db

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# todo:
npm run clean

# build for production with minification
npm run compile

# run server in production
npm start

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 常见问题

- do NOT use `@import` in css
- node@5.7.0 did NOT work for the `path.parse` issue

## 兼容性

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 10+ ✔ | Latest ✔ | 6.1+ ✔ |
