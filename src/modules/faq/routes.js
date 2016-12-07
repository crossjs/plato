export const createRoutes = ({ prefix = '' } = {}) => {
  prefix = `/${prefix}/`.replace(/\/\/+/g, '/')
  return [
    {
      path: `${prefix}`,
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
