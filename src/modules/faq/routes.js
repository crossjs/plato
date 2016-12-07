export const createRoutes = ({ prefix = '/' } = {}) => {
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
