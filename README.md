<p align="center">
  <img src="https://cdn.rawgit.com/crossjs/plato/next/src/assets/logo.svg" alt="PLATO"><br>
  <sub>Based on Vue 2.0</sub>
</p>
<p align="center">
  <a href="https://travis-ci.org/crossjs/plato"><img src="https://img.shields.io/travis/crossjs/plato.svg?style=flat-square" alt="Travis"></a>
  <a href="https://coveralls.io/github/crossjs/plato"><img src="https://img.shields.io/coveralls/crossjs/plato.svg?style=flat-square" alt="Coveralls"></a>
  <a href="https://david-dm.org/crossjs/plato"><img src="https://david-dm.org/crossjs/plato.svg?style=flat-square" alt="dependencies"></a>
  <a href="https://david-dm.org/crossjs/plato?type=dev"><img src="https://david-dm.org/crossjs/plato/dev-status.svg?style=flat-square" alt="devDependency Status"></a>
</p>
<p align="center">
  a Boilerplate for SPAs use vue, vuex, vue-router<br>
  Check out <a href="http://crossjs.com/plato/#/demos"><b>Demos</b></a> and <a href="src/components/README.md"><b>Readme</b></a> for UI Components
</p>

## Usage

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# eslint, stylelint, unit and e2e test
npm test

# generate demo site and push to gh-pages
npm run docs

# push modifications to github
npm run push

# debugging with `node-inspector &`
npm run debug
```

## Changelog

- 20160930 :warning: *Breaking Changes*
  - adjust file structure
  - update [vue-router](https://github.com/vuejs/vue-router/releases/tag/v2.0.0-rc.6)
- 20160929
  - add some components: range, picker, scroller, slider, etc
- 20160925
  - update dependencies, use `vuex/dist/logger` instead of `vuex/logger`
- 20160921
  - use [postcss-flexible](https://github.com/crossjs/postcss-flexible)
- 20160907 :warning: *Breaking Changes*
  - fix #22 use vuex-actions instead of vuex-promise
- 20160807
  - use new meta format in actions
- 20160805
  - add transition
- 20160730 :warning: *Breaking Changes*
  - use vue@2.0.0-beta
- 20160721
  - rename vx to store
  - move types to modules
- 20160715
  - use vuex-localstorage@0.2.0, with expires options
- 20160709 :warning: *Breaking Changes*
  - use [vuex@2.0.0-rc.1](https://github.com/vuejs/vuex/releases/tag/v2.0.0-rc.1)
  - update vuex-promise@2.0.0.rc.1
  - rewite vx/**
- 20160704 :warning: *Breaking Changes*
  - use [vuex@1.0.0-rc](https://github.com/vuejs/vuex/releases/tag/v1.0.0-rc)
  - update vuex-promise@1.0.1
  - rewite vx/modules
- 20160701
  - make plato simple: remove built-in components, use plato-components
- 20160630
  - update npm scripts
- 20160629
  - 升级 vue@1.0.26，解决 [#5](https://github.com/crossjs/plato/issues/5)
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

## License

[MIT](http://opensource.org/licenses/MIT)
