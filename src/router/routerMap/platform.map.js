// 平台端路由映射
export default {
  platformNotice: {
    path: 'platformNotice',
    name: 'platformNotice',
    component: () => import('@/pages/platform/notice/index'),
    meta: {
      keepAlive: false,
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
      // hideCopyRight: true, // 是否隐藏页面底部的版权。（当有的页面结构特殊，需要隐藏外层的版权，将版权放在页面内结构中）
    },
  },
  // ShopVips 会员
  //会员列表
  VipList: {
    path: '/inviteFriendConfig',
    name: 'CoreInviteFriendConfig',
    component: () => import('@/pages/platform/setting/appConfigure/inviteFriendConfig/index'),
    meta:{
      keepAlive: false
    }

  },
  // 升级记录
  UpgradeLogs: {
    path: 'UpgradeLogs',
    name: 'UpgradeLogs',
    component: () => import('@/pages/platform/vips/upgradeLogs'),
    meta:{
      keepAlive: false
    }
  },
  // 基础配置
  BasicConfiguration: {
    path: 'BasicConfiguration',
    name: 'BasicConfiguration',
    component: () => import('@/pages/platform/vips/basicConfiguration'),
    meta:{
      keepAlive: false
    }
  },
  // 等级列表
  GradeList: {
    path: 'GradeList',
    name: 'GradeList',
    component: () => import('@/pages/platform/vips/gradeList'),
    meta:{
      keepAlive: false
    }
  },
  // 编辑等级列表
  editDefaultLevel: {
    path: 'editDefaultLevel',
    name: 'editDefaultLevel',
    component: () => import('@/pages/platform/vips/editDefaultLevel'),
    meta:{
      keepAlive: false,
      invisible:true, 
      hideCopyRight:true
    }
  },
  // 设置返佣权益
  setReturnedCommission: {
    path: 'setReturnedCommission',
    name: 'setReturnedCommission',
    component: () => import('@/pages/platform/vips/setReturnedCommission'),
    meta:{
      keepAlive: false,
      invisible:true, 
      hideCopyRight:true
    }
  },
  // 设置权益
  setRightsInterests: {
    path: 'setRightsInterests',
    name: 'setRightsInterests',
    component: () => import('@/pages/platform/vips/setRightsInterests'),
    meta:{
      keepAlive: false,
      invisible:true, 
      hideCopyRight:true
    }
  },
  // 会员关系树
  vipsTree: {
    path: 'vipsTree',
    name: 'vipsTree',
    component: () => import('@/pages/platform/vips/vipsTree/index'),
    meta:{
      keepAlive: false
    }
  },
  // 平台端更新记录
  platformSystemUpdate: {
    path: 'platformSystemUpdate',
    name: 'platformSystemUpdate',
    component: () => import('@/pages/platform/systemUpdate/index'),
    meta:{
      keepAlive: false
    }
  },
  // 平台端消息日志
  platformMessageLog: {
    path: 'platformMessageLog',
    name: 'platformMessageLog',
    component: () => import('@/pages/platform/message/messageLog/index'),
    meta:{
      keepAlive: false
    }
  },
}