export const createRoutes = ({ prefix = '/' } = {}) => {
  return [
    {
      path: `${prefix}`,
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
