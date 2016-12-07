export const createRoutes = ({ prefix = '' } = {}) => {
  prefix = `/${prefix}/`.replace(/\/\/+/g, '/')
  return [
    {
      path: `${prefix}`.replace(/\/$/, ''),
      meta: {
        icon: 'eye'
      },
      component: () => System.import('./views/index')
    },
    {
      path: `${prefix}:component`,
      meta: {
        hidden: true
      },
      component: () => System.import('./views/index')
    }
  ]
}
