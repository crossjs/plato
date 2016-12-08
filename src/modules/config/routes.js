export const createRoutes = ({ prefix = '' } = {}) => {
  prefix = `/${prefix}/`.replace(/\/\/+/g, '/')
  return [
    {
      path: `${prefix}`.replace(/\/$/, ''),
      meta: {
        icon: 'globe'
      },
      component: () => System.import('./views/index')
    }
  ]
}
