<p align="center">
  <img src="https://cdn.rawgit.com/platojs/plato/master/src/assets/logo.svg" alt="PLATO"><br>
  <sub>Based on Vue 2.x</sub>
</p>
<p align="center">
  <a href="https://travis-ci.org/platojs/plato"><img src="https://img.shields.io/travis/platojs/plato.svg?style=flat-square" alt="Travis"></a>
  <a href="https://coveralls.io/github/platojs/plato"><img src="https://img.shields.io/coveralls/platojs/plato.svg?style=flat-square" alt="Coveralls"></a>
  <a href="https://david-dm.org/platojs/plato"><img src="https://img.shields.io/david/platojs/plato.svg?style=flat-square" alt="dependencies Status"></a>
  <a href="https://david-dm.org/platojs/plato?type=dev"><img src="https://img.shields.io/david/dev/platojs/plato.svg?style=flat-square" alt="devDependencies Status"></a>
</p>
<p align="center">
  a Boilerplate for [mobile] SPAs using vue, vuex, vue-router<br>
  Check out <a href="http://platojs.crossjs.com/"><b>Documentation</b></a>, <a href="http://plato.crossjs.com/#/demo"><b>Demonstrations</b></a> and UI <a href="https://github.com/platojs/components"><b>Components</b></a>
</p>

[中文说明](README-ZH.md)

## Principles

[Less is More](https://en.wikipedia.org/wiki/Minimalism)

[Entities must not be multiplied beyond necessity](https://en.wikipedia.org/wiki/Occam%27s_razor)

## Scaffolding

[Vue CLI Template](https://github.com/platojs/template)

## Features

- [Core](https://github.com/platojs/platojs)
  - [system](https://github.com/platojs/system)
  - [util](https://github.com/platojs/util)
  - [components](https://github.com/platojs/components)
  - [directives](https://github.com/platojs/directives)
  - [plugins](https://github.com/platojs/plugins)
- Vue
  - [Vue](https://github.com/vuejs/vue)
  - [Vue-Router](https://github.com/vuejs/vue-router)
  - [Vuex](https://github.com/vuejs/vuex)
  - [Vuex-Actions](https://github.com/weinot/vuex-actions) (for async actions)
  - [Vuex-LocalStorage](https://github.com/crossjs/vuex-localstorage) (for cache and persistence)
- Build
  - [Webpack](http://webpack.github.io/)
- Linters
  - [ESLint](http://eslint.org/)
  - [stylelint](http://stylelint.io/)
- Tests
  - [Karma](https://karma-runner.github.io/)
  - [Mocha](https://mochajs.org/)
  - [Nightwatch](http://nightwatchjs.org/)
  - [Selenium-Server](https://github.com/eugeneware/selenium-server)
- Transformers
  - [PostCSS](http://postcss.org/) (for css next)
    - [postcss-rtl](https://github.com/vkalinichev/postcss-rtl)
    - [postcss-flexible](https://github.com/crossjs/postcss-flexible) (for [lib.flexible](https://github.com/amfe/lib-flexible))
    - ...
  - [Babel](https://babeljs.io/) (for es6)
- Worth Reading Modules
  - [Logger](src/modules/logger)
  - [Persist](src/modules/persist)
  - [I18n](src/modules/i18n)
  - [Validator](src/modules/validator)
  - [Request](src/modules/request)

## Usage

```bash
# switch npm registry mirror
npm run mirror:<sdp|tb|npm>

# install dependencies with mirrors
npm run init

# lock dependencies version
npm run lock

# serve with hot reload at localhost:3000
npm run dev

# eslint, stylelint, unit and e2e test
npm test

# test, clean, and compile
npm run build

# serve dist, like production
npm start

# generate demo site and push to gh-pages
npm run demo

# push modifications to github
npm run push
```

## Browser Support

- IE 9+
- Chrome
- Safari
- Firefox
- ...
- Android 4+
- iOS 7+

## License

[MIT](http://opensource.org/licenses/MIT)
