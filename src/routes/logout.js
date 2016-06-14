export default {
  icon: 0xe601,
  title: 'routes.logout',
  name: 'logout',
  auth: true,
  component: resolve => require(['views/logout'], resolve)
}
