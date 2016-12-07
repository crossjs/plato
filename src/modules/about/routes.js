export const createRoutes = ({ prefix = '/' } = {}) => {
  return [
    {
      path: `${prefix}`,
      meta: {
        icon: 'question'
      },
      component: () => System.import('./views/index')
    }
  ]
}
