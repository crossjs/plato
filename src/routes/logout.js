export default {
  name: 'logout',
  auth: true,
  hidden: true,
  component: resolve => require(['views/logout'], resolve)
}
