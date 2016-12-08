export const createRoutes = ({ prefix = '' } = {}) => {
  prefix = `/${prefix}/`.replace(/\/\/+/g, '/')
  return [
    {
      path: `${prefix}globe`,
      meta: {
        icon: 'globe'
      },
      component: () => System.import('./views/globe')
    }
  ]
}
