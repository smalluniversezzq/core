import componentsMap from '@/router/routerMap/components.map'
import practiceMap from '@/router/routerMap/practice.map'
import superMap from '@/router/routerMap/super.map'
import platformSettingMap from '@/router/routerMap/platformSetting.map'
import platform from '@/router/routerMap/platform.map'
import help from '@/router/routerMap/help.map'
import integral from '@/router/routerMap/integral.map'

// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  tabsBy: () => import('@/layouts/tabs/TabsViewBy'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login/LoginBy'),
    meta: {title: '登录'},
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  root: {
    path: '/',
    name: '首页',
    redirect: '/genBackstage',
    component: view.tabsBy
  },
  parent1: {
    name: '父级路由1',
    icon: 'dashboard',
    component: view.blank
  },
  parent2: {
    name: '父级路由2',
    icon: 'form',
    component: view.page
  },
  exception: {
    name: '异常页',
    icon: 'warning',
    component: view.blank
  },
  iframeview: {
    name: 'iframeview',
    component: () => import('@/pages/iframe/iframe')
  },
  blankview: {
    name: 'blankview',
    component: () => import('@/layouts/BlankView')
  },
  /**平台端 */
  CorePlatformRouter: {
    path: '/corePlatform',
    name: 'CorePlatformRouter',
    component: () => import('@/pages/platform/index.vue')
  },
  /**总控制台端 */
  genBackstage: {
    path: '/genBackstage',
    redirect: '/genBackstage/myPlatform/myAppList',
    name: '平台入口页',
    component: () => import('@/pages/genBackstage/index')
  },
  // 我的应用
  myAppList: {
    path: 'myAppList',
    name: '我的应用',
    component: () => import('@/pages/genBackstage/myApp')
  },
  myAppDetails: {
    path: 'myAppDetails',
    name: '平台详情',
    component: () => import('@/pages/genBackstage/myApp/details')
  },
  createApp: {
    path: 'createApp',
    name: '创建应用',
    component: () => import('@/pages/genBackstage/myApp/create'),
    meta: {
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
      hideCopyRight: true, // 是否隐藏页面底部的版权。（当有的页面结构特殊，需要隐藏外层的版权，将版权放在页面内结构中）
    }
  },
  starBeacon: {
    path: 'starBeacon',
    name: '我的星标',
    component: () => import('@/pages/genBackstage/starBeacon')
  },
  recycleBin: {
    path: 'recycleBin',
    name: '回收站',
    component: () => import('@/pages/genBackstage/recycleBin')
  },
  accountInfo: {
    path: 'accountInfo',
    name: '个人信息',
    component: () => import('@/pages/genBackstage/accountCenter/index')
  },
  loginLog: {
    path: 'loginLog',
    name: '登录日志',
    component: () => import('@/pages/genBackstage/loginLog/index')
  },
  /**demo表格 */
  demoTable: {
    name: 'demoTable',
    component: () => import('@/pages/demo/demoTable'),
    meta:{title: '表格'}
  },
  // iframe对应的router
  iframeRouter: {
    name: 'iframeRouter'
  },
  // 超管功能页
  ...superMap,
  // 练手页面
  ...practiceMap,
  // 组件demo路由
  ...componentsMap,
  // 平台系统设置路由
  ...platformSettingMap,
  // 平台端路由映射
  ...platform,
  // 帮助中心路由映射
  ...help,
  // 积分
  ...integral
}
export default routerMap

