## views 与 components 的区别

### views 下的 .vue 文件一般与路由对应，同时也有 Smart Components 的特征

如下路由配置文件中的 component 指向 views 目录下的 .vue 文件

```js
return [
  {
    path: '/',
    exact: true,
    component: () => import('./views/index')
  },
  {
    path: '/create',
    meta: {
      auth: true,
      icon: 'plus'
    },
    component: () => import('./views/create')
  }
]
```

### components 下的 .vue 文件，则可认为是 Dumb Components

### 附录

[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.clxt1j7m1)
