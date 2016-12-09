export const createRoutes = ({ name, prefix = '' } = {}) => {
  prefix = `/${prefix}/`.replace(/\/\/+/g, '/')
  return [
    {
      path: `${prefix}`.replace(/\/$/, ''),
      meta: {
        icon: 'globe'
      },
      component: () => System.import('./views/index').then(module => Object.assign(module, { __name: name }))
    }
  ]
}
