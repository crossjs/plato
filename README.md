# plat

> A plat<del>form</del> built with koa and vue

## Requires

- koa
- vue
- mongodb
- webpack
- postcss

## Build Setup

``` bash
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

## Mongo

``` bash
mongod --dbpath path/to/data/db
```

## Tips

- do NOT use `@import` in css
- node@5.7.0 did NOT work for the `path.parse` issue
