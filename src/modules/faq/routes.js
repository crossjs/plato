export const createRoutes = ({ prefix = '' } = {}) => {
  prefix = `/${prefix}/`.replace(/\/\/+/g, '/')
  return [
    {
      path: `${prefix}`.replace(/\/$/, ''),
      exact: true,
      component: () => System.import('./views/index')
    },
    {
      path: `${prefix}create`,
      meta: {
        auth: true,
        icon: 'plus'
      },
      component: () => System.import('./views/create')
    }
  ]
}
