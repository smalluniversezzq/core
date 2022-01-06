/**
 * 超管 的功能页
 */
export default {
  /** 按钮 组件 展示 */
  demoButton: {
    component: () => import('@/pages/demo/demoButton/demoButton')
  },
  platformManage: {
    path: 'platformManage',
    name: '平台管理',
    component: () => import('@/pages/genBackstage/super/platformManage/list')
  },
  platformCreate: {
    path: 'platformCreate',
    name: '添加平台',
    component: () => import('@/pages/genBackstage/super/platformManage/create'),
    meta: {
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
      hideCopyRight: true, // 是否隐藏页面底部的版权。（当有的页面结构特殊，需要隐藏外层的版权，将版权放在页面内结构中）
    }
  },
  platformDetail: {
    path: 'platformDetail',
    name: '平台详情',
    component: () => import('@/pages/genBackstage/super/platformManage/platformDetail'),
    meta: {
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  audit: {
    path: 'audit',
    name: '平台审核',
    component: () => import('@/pages/genBackstage/super/audit')
  },
  examine: {
    path: 'examine',
    name: '审核页',
    component: () => import('@/pages/genBackstage/super/audit/examine'),
    meta: {
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  users: {
    path: 'users',
    name: '用户管理',
    component: () => import('@/pages/genBackstage/super/users')
  },
  recycleBinOfAdmin: {
    path: 'recycleBin',
    name: '平台回收站',
    component: () => import('@/pages/genBackstage/super/platformManage/recycleBin')
  },
  group: {
    path: 'group',
    name: '应用套餐',
    component: () => import('@/pages/genBackstage/super/group')
  },
  addGroup: {
    path: 'addGroup',
    name: '添加套餐',
    component: () => import('@/pages/genBackstage/super/group/add'),
    meta: {
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  thirdpartyConfigure: {
    path: 'thirdpartyConfigure',
    name: '三方设置',
    component: () => import('@/pages/genBackstage/setting/thirdpartyConfigure/index'),
    meta: {
      invisible: false, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  defaultConfig: {
    path: 'defaultConfig',
    name: '默认配置',
    component: () => import('@/pages/genBackstage/setting/defaultConfig/index'),
    meta: {
      invisible: false, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  superNotice: {
    path: 'superNotice',
    name: '通知公告',
    component: () => import('@/pages/genBackstage/setting/notice/index'),
    meta: {
      invisible: false, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  systemUpdate: {
    path: 'systemUpdate',
    name: '系统更新',
    component: () => import('@/pages/genBackstage/setting/systemUpdate/index'),
    meta: {
      invisible: false, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  superNoticeAddOrEdit: {
    path: 'superNoticeAddOrEdit',
    name: '新增/编辑公告',
    component: () => import('@/pages/genBackstage/setting/notice/addOrEdit'),
    meta: {
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  helpCenter: {
    path: 'helpCenter',
    name: '帮助中心',
    component: () => import('@/pages/genBackstage/setting/helpCenter/index'),
    meta: {
      invisible: false, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
}