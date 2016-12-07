export const createRoutes = ({ prefix = '' } = {}) => {
  prefix = `/${prefix}/`.replace(/\/\/+/g, '/')
  return [
    {
      path: `${prefix}login`,
      meta: {
        icon: 'lock',
        auth: false
      },
      component: () => System.import('./views/login')
    },
    {
      path: `${prefix}logout`,
      meta: {
        icon: 'lock',
        auth: true
      },
      component: () => System.import('./views/logout')
    },
    {
      path: `${prefix}globe`,
      meta: {
        icon: 'globe'
      },
      component: () => System.import('./views/globe')
    }
  ]
}
