export default {
  // icon: 'logout',
  // title: '退出',
  name: 'logout',
  auth: true,
  hidden: true,
  component: resolve => require(['views/logout'], resolve)
}
