// 平台系统设置路由映射
export default {
  // 站点设置
  siteConfig: {
    path: 'siteConfig',
    name: 'siteConfig',
    component: () => import('@/pages/platform/setting/siteConfig'),
    meta: {
      keepAlive: false
    }
  },
  // App版本管理
  appVersions: {
    path: 'appVersions',
    name: 'appVersions',
    component: () => import('@/pages/platform/setting/appConfigure/appVersions/index'),
    meta: {
      keepAlive: false
    }
  },
  //添加/编辑版本
  appVersionsAddOrEditor: {
    path: 'appVersionsAddOrEditor',
    name: 'appVersionsAddOrEditor',
    component: () => import('@/pages/platform/setting/appConfigure/appVersions/addOrEditor'),
    meta: {
      keepAlive: false,
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
      // hideCopyRight: true, // 是否隐藏页面底部的版权。（当有的页面结构特殊，需要隐藏外层的版权，将版权放在页面内结构中）
    }
  },
  // App打包
  appBuildConfig: {
    path: 'appBuildConfig',
    name: 'appBuildConfig',
    component: () => import('@/pages/platform/setting/appConfigure/appBuildConfig'),
    meta: {
      keepAlive: false
    }
  },
  // // 打包配置
  PackConfig: {
    path: 'PackConfig',
    name: 'PackConfig',
    component: () => import('@/pages/platform/setting/appConfigure/PackConfig'),
    meta: {
      keepAlive: false
    }
  },
  // App全局配置
  appGlobalConfig: {
    path: 'appGlobalConfig',
    name: 'appGlobalConfig',
    component: () => import('@/pages/platform/setting/appConfigure/appGlobalConfig/index.vue'),
    meta: {
      keepAlive: false
    }
  },
  // APP下载
  AppUpdate: {
    path: 'downloadConfig',
    name: 'downloadConfig',
    component: () => import('@/pages/platform/setting/appConfigure/appGlobalConfig/downloadConfig.vue'),
    meta: {
      keepAlive: false,
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
    }
  },
  // 默认展示
  DefaultDisplay: {
    path: 'DefaultDisplay',
    name: 'DefaultDisplay',
    component: () => import('@/pages/platform/setting/appConfigure/appGlobalConfig/initContentConfig.vue'),
    meta: {
      keepAlive: false
    }
  },
  // 注册登录
  registerAndLogin: {
    path: 'registerAndLogin',
    name: 'registerAndLogin',
    component: () => import('@/pages/platform/setting/appConfigure/registerAndLogin'),
    meta: {
      keepAlive: false
    }
  },
  // 闪屏广告
  advertisement: {
    path: 'advertisement',
    name: 'advertisement',
    component: () => import('@/pages/platform/setting/appConfigure/advertisement.vue'),
    meta: {
      keepAlive: false
    }
  },
  // 协议配置
  procotolConfig: {
    path: 'procotolConfig',
    name: 'procotolConfig',
    component: () => import('@/pages/platform/setting/appConfigure/procotolConfig'),
    meta: {
      keepAlive: false
    }
  },
  // 微信配置
  weixinConfig: {
    path: 'weixinConfig',
    name: 'weixinConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/weixinConfig'),
    meta: {
      keepAlive: false
    }
  },
  // 支付宝配置
  alipayConfig: {
    path: 'alipayConfig',
    name: 'alipayConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/alipayConfig'),
    meta: {
      keepAlive: false
    }
  },
  // 实名认证配置
  realNameAuthentication: {
    path: 'realNameAuthentication',
    name: 'realNameAuthentication',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/realNameAuthentication'),
    meta: {
      keepAlive: false
    }
  },
  // 短信配置
  smsConfig: {
    path: 'smsConfig',
    name: 'smsConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/smsConfig/index'),
    meta: {
      keepAlive: false
    }
  },
  // 短信模板
  settingMould: {
    path: 'settingMould',
    name: 'settingMould',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/smsConfig/settingMould'),
    meta: {
      keepAlive: false
    }
  },
  // 分享配置
  shareConfig: {
    path: 'shareConfig',
    name: 'shareConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/shareConfig/index'),
    meta: {
      keepAlive: false
    }
  },
  // 推送配置
  pushConfig: {
    path: 'pushConfig',
    name: 'pushConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/pushConfig'),
    meta: {
      keepAlive: false
    }
  },
  // 高德地图配置
  aMapConfig: {
    path: 'aMapConfig',
    name: 'aMapConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/aMapConfig'),
    meta: {
      keepAlive: false
    }
  },
  // 客服配置
  supportStaffConfig: {
    path: 'supportStaffConfig',
    name: 'supportStaffConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/supportStaffConfig'),
    meta: {
      keepAlive: false
    }
  },
  // 物流配置
  logisticsConfig: {
    path: 'logisticsConfig',
    name: 'logisticsConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/logisticsConfig'),
    meta: {
      keepAlive: false
    }
  },
  // 存储配置
  storageConfig: {
    path: 'storageConfig',
    name: 'storageConfig',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/storageConfig'),
    meta: {
      keepAlive: false
    }
  },
  feedBack: {
    path: 'feedBack',
    name: 'CoreFeedBack',
    component: () => import('@/pages/platform/setting/feedBack/index'),
    meta: {
      keepAlive: false
    }
  },
  // 小程序配置
  mpConfig: {
    path: 'mpConfig',
    name: 'mpConfig',
    component: () => import('@/pages/platform/setting/wxApplets/index')
  },
  // 操作日志
  operateConfig: {
    path: 'operateConfig',
    name: 'operateConfig',
    component: () => import('@/pages/platform/setting/operateConfig/index'),
    meta: {
      keepAlive: false
    }
  },
  releaseMessage: {
    path: 'releaseMessage',
    name: 'releaseMessage',
    component: () => import('@/pages/platform/message/releaseMessage/index'),
    meta: {
      keepAlive: false
    }
  },
  addOrEditMessage: {
    path: 'addOrEditMessage',
    name: 'addOrEditMessage',
    component: () => import('@/pages/platform/message/releaseMessage/addOrEdit'),

    meta: {
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单
      keepAlive: false,
      // hideCopyRight: true, // 是否隐藏页面底部的版权。（当有的页面结构特殊，需要隐藏外层的版权，将版权放在页面内结构中）
    },
  },
  autoMessageTemplate: {
    path: 'autoMessageTemplate',
    name: 'autoMessageTemplate',
    component: () => import('@/pages/platform/message/autoMessageTemplate/index'),
    meta: {
      keepAlive: false
    }
  },
  addOrEditMessageTemplate: {
    path: 'addOrEditMessageTemplate',
    name: 'addOrEditMessageTemplate',
    component: () => import('@/pages/platform/message/autoMessageTemplate/addOrEdit'),
    meta: {
      invisible: true, // 为ture：隐藏菜单; false: 显示此菜单。
      keepAlive: false
      // hideCopyRight: true, // 是否隐藏页面底部的版权。（当有的页面结构特殊，需要隐藏外层的版权，将版权放在页面内结构中）
    },
  },
  thirdpartyConfigureInex: {
    path: 'thirdpartyConfigureInex',
    name: 'thirdpartyConfigureInex',
    component: () => import('@/pages/platform/setting/thirdpartyConfigure/index'),
    meta: {
      keepAlive: false
    }
  },
  // 邀请码设置
  invitationCode: {
    path: 'invitationCode',
    name: 'invitationCode',
    component: () => import('@/pages/platform/setting/appConfigure/invitationCode'),
    meta: {
      keepAlive: false
    }
  },
  pageRenovation: {
    path: 'pageRenovation',
    name: 'CorePageRenovation',
    component: () => import('@/pages/platform/renovation/pageRenovation/index'),
    meta: {
      keepAlive: false
    }
  },
  // 底部导航
  bottomNavigation: {
    path: 'bottomNavigation',
    name: 'bottomNavigation',
    component: () => import('@/pages/platform/renovation/bottomNavigation/index'),
    meta: {
      keepAlive: false
    }
  },
  // 分类按钮组
  classifyButtonGroup: {
    path: 'classifyButtonGroup',
    name: 'classifyButtonGroup',
    component: () => import('@/pages/platform/renovation/classifyButtonGroup/index'),
    meta: {
      keepAlive: false
    }
  },
  //搜索个性化
  searchPersonalize: {
    path: 'searchPersonalize',
    name: 'searchPersonalize',
    component: () => import('@/pages/platform/renovation/searchPersonalize/index'),
    meta: {
      keepAlive: false
    }
  },
  diyOnePage: {
    path: '/diyOnePage',
    name: 'CoreDiyOnePage',
    component: () => import('@/pages/platform/renovation/pageDiy/'),
    meta: {
      title: '页面装修',
      keepAlive: false
    },
  },
  diyOneNav: {
    path: '/diyOneNav',
    name: 'CoreDiyOneNav',
    component: () => import('@/pages/platform/renovation/navDiy/'),
    meta: { title: '导航装修' },
    keepAlive: false
  },
  // 邀请好友配置
  inviteFriendConfig: {
    path: '/inviteFriendConfig',
    name: 'CoreInviteFriendConfig',
    component: () => import('@/pages/platform/setting/appConfigure/inviteFriendConfig/index'),
    meta: {
      keepAlive: false
    }
  },
  myFans: {
    path: 'myFans',
    name: 'myFans',
    component: () => import('@/pages/platform/setting/myFans/index'),
    meta: {
      keepAlive: false
    }
  },
}



