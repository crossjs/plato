# Troubleshooting

- Nodemon has error with node < 6.8.0, so please use node 5.12.0 or latest
- Firefox 49 has error in e2e test on macOS, so please use firefox 44
- Selenium 3.0.1 NOT compatibility with travis, so use 2.53.1
- postcss-import 8.1.1+ has a [bug](https://github.com/postcss/postcss-import/issues/207), should downgrade to 8.1.0, waiting for [this](https://github.com/postcss/postcss-import/pull/243)
- 需要在 `body` 标签添加 `ontouchstart=""` 属性，才能激活移动端的 `:active` 伪类
