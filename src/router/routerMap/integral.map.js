// 平台端路由映射
export default {
  // 积分配置
  IntegralAllocation: {
    path: 'IntegralAllocation',
    name: 'IntegralAllocation',
    component: () => import('@/pages/platform/Integral/IntegralAllocation'),
    meta:{
      keepAlive: false
    }
  },
  //我的积分
  //积分主页
  PointHomePage: {
    path: 'PointHomePage',
    name: 'PointHomePage',
    component: () => import('@/pages/platform/Integral/MyIntegral/PointHomePage'),
    meta:{
      keepAlive: false
    }
  },
  //签到管理
  SignManage: {
    path: 'SignManage',
    name: 'SignManage',
    component: () => import('@/pages/platform/Integral/MyIntegral/SignManage'),
    meta:{
      keepAlive: false
    }
  },
  //任务管理
  TaskManage: {
    path: 'TaskManage',
    name: 'TaskManage',
    component: () => import('@/pages/platform/Integral/MyIntegral/TaskManage'),
    meta:{
      keepAlive: false
    }
  },
  // 积分明细
  PointsDetails: {
    path: 'PointsDetails',
    name: 'PointsDetails',
    component: () => import('@/pages/platform/Integral/pointsDetails/index'),
    meta:{
      keepAlive: false
    }
  },
}