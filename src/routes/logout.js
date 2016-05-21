export default {
  icon: 'logout',
  title: '退出',
  name: 'logout',
  auth: true,
  component: resolve => require(['views/logout'], resolve)
}
