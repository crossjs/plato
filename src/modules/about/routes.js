export const createRoutes = ({ prefix = '' } = {}) => {
  prefix = `/${prefix}/`.replace(/\/\/+/g, '/')
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
