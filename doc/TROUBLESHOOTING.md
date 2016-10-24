# Troubleshooting

- Nodemon has error with node < 6.8.0, so please use node 5.12.0 or latest
- Firefox 49 has error in e2e test on macOS, so please use firefox 44
- postcss-import 8.1.2 has a [bug](https://github.com/postcss/postcss-import/issues/207), should downgrade to 8.0.2
- 需要在 `body` 标签添加 `ontouchstart=""` 属性，才能激活移动端的 `:active` 伪类
