import routerMap from './router.map'
import { parseRoutes } from '@/utils/routerUtil'

// 异步路由配置
const routesConfig = [
  'login',
  'root',
  {
    router: 'root',
    path: '*',
    name: '404'
  },
  {
    router: 'exp403',
    path: '/403',
    name: '403'
  },
  'diyOnePage',
  'diyOneNav',
  {
    router: 'CorePlatformRouter'
  },
  {
    router: 'genBackstage',
    name: '总后台',
    children: [
      {
        router: 'parent1',
        path: 'myPlatform',
        name: 'myPlatform',
        icon: 'iconpingtaixinxi',
        redirect: {name: 'myApp'},
        meta: { title: '平台管理'},
        children: [
          {
            icon: 'none',
            redirect: {name: 'myAppList'},
            router: 'parent1',
            path: 'myAppList',
            name: 'myApp',
            meta: {
              title: '我的平台',
              breadcrumb: [
                {name: '平台管理'},
                {name: '我的平台'}
              ]
            },
            children: [
              {
                router: 'myAppList',
                path: 'myAppList',
                name: 'myAppList',
                meta: {
                  invisible: true,
                  title: '我的平台',
                  breadcrumb: [
                    {name: '平台管理'},
                    {name: '我的平台'}
                  ]
                }
              },
              {
                router: 'myAppDetails',
                path: 'myAppDetails',
                name: 'myAppDetails',
                meta: {
                  title: '平台详情',
                  invisible: true,
                  breadcrumb: [
                    {name: '平台管理'},
                    {name: '我的平台', path: '/genBackstage/myPlatform/myAppList/myAppList'},
                    {name: '平台详情'},
                  ]
                }
              },
              {
                router: 'createApp',
                path: 'createApp',
                name: 'createApp',
                meta: {
                  title: '添加平台',
                  invisible: true,
                  breadcrumb: [
                    {name: '平台管理'},
                    {name: '我的平台', path: '/genBackstage/myPlatform/myAppList/myAppList'},
                    {name: '添加平台'},
                  ]
                }
              },
            ]
          },
          {
            icon: 'none',
            redirect: {name: 'starBeacon'},
            router: 'parent1',
            path: 'starBeacon',
            name: 'starBeaconPage',
            meta: {
              title: '我的星标',
              breadcrumb: [
                {name: '平台管理'},
                {name: '我的星标'},
              ],
            },
            children: [
              {
                router: 'starBeacon',
                path: 'starBeacon',
                name: 'starBeacon',
                meta: {
                  invisible: true,
                  title: '我的星标',
                  breadcrumb: [
                    {name: '平台管理'},
                    {name: '我的星标'},
                  ],
                }
              }
            ]
          },
          {
            icon: 'none',
            redirect: {name: 'recycleBin'},
            router: 'parent1',
            path: 'recycleBin',
            name: 'recycleBinPage',
            meta: {
              title: '回收站',
              breadcrumb: [
                {name: '平台管理'},
                {name: '回收站'},
              ]
            },
            children: [
              {
                router: 'recycleBin',
                path: 'recycleBin',
                name: 'recycleBin',
                meta: {
                  invisible: true,
                  title: '回收站',
                  breadcrumb: [
                    {name: '平台管理'},
                    {name: '回收站'},
                  ]
                }
              },
            ]
          },
          // {
          //   redirect: {name: 'myAppDetailsPage'},
          //   router: 'myAppDetails',
          //   // path: 'myAppDetails',
          //   name: 'myAppDetails',
          //   meta: {
          //     title: '平台详情',
          //     invisible: true,
          //     breadcrumb: [
          //       {name: '平台管理'},
          //       {name: '我的平台', path: '/genBackstage/myPlatform/myAppList'},
          //       {name: '平台详情'},
          //     ]
          //   }
          // },
        ]
      },
      {
        router: 'parent1',
        path: 'platformCenter',
        name: 'platformCenter',
        icon: 'iconkuapingtaiyingyong',
        meta: {
          title: '平台中心',
          invisible: false,
          roleList: ['is_super']
        },
        children: [
          {
            icon: 'none',
            redirect: {name: 'platformManage'},
            router: 'parent1',
            name: 'platformManagePage',
            meta: {
              title: '平台管理',
              breadcrumb: [
                {name: '平台中心'},
                {name: '平台管理'},
              ]
            },
            children: [
              {
                router: 'platformManage',
                name: 'platformManage',
                meta: {
                  title: '平台管理',
                  invisible: true,
                  breadcrumb: [
                    {name: '平台中心'},
                    {name: '平台管理'},
                  ]
                }
              },
              {
                // 站长添加
                router: 'platformCreate',
                name: 'platformCreate',
                meta: {
                  title: '添加平台',
                  invisible: true,
                  breadcrumb: [
                    {name: '平台中心'},
                    {name: '平台管理', path: '/genBackstage/platformCenter/platformManage'},
                    {name: '添加平台'},
                  ]
                }
              },
              {
                router: 'platformDetail',
                name: 'superPlatform',
                meta: {
                  title: '平台详情',
                  invisible: true,
                  breadcrumb: [
                    {name: '平台中心'},
                    {name: '平台管理', path: '/genBackstage/platformCenter/platformManage'},
                    {name: '平台详情'},
                  ]
                }
              },
            ]
          },
          {
            icon: 'none',
            redirect: {name: 'audit'},
            router: 'parent1',
            path: 'audit',
            name: 'auditPage',
            meta: {
              title: '平台审核',
              breadcrumb: [
                {name: '平台中心'},
                {name: '平台审核'},
              ]
            },
            children: [
              {
                router: 'audit',
                path: 'audit',
                name: 'audit',
                meta: {
                  invisible: true,
                  title: '平台审核',
                  breadcrumb: [
                    {name: '平台中心'},
                    {name: '平台审核'},
                  ]
                }
              },
              {
                router: 'examine',
                path: 'examine',
                name: 'examine',
                meta: {
                  invisible: true,
                  title: '审核页',
                  breadcrumb: [
                    {name: '平台中心'},
                    {name: '平台审核', path: '/genBackstage/platformCenter/audit'},
                    {name: '审核页'},
                  ]
                }
              },
            ]
          },
          {
            icon: 'none',
            redirect: {name: 'group'},
            router: 'parent1',
            path: 'group',
            name: 'groupPage',
            meta: {
              title: '应用套餐',
              breadcrumb: [
                {name: '平台中心'},
                {name: '应用套餐'},
              ]
            },
            children: [
              {
                router: 'group',
                path: 'group',
                name: 'group',
                meta: {
                  invisible: true,
                  title: '应用套餐',
                  breadcrumb: [
                    {name: '平台中心'},
                    {name: '应用套餐'},
                  ]
                }
              },
              {
                router: 'addGroup',
                path: 'addGroup',
                name: 'addGroup',
                meta: {
                  invisible: true,
                  title: '添加套餐',
                  breadcrumb: [
                    {name: '平台中心'},
                    {name: '应用套餐', path: '/genBackstage/platformCenter/group'},
                    {name: '添加套餐'},
                  ]
                }
              },
            ]
          },
          {
            icon: 'none',
            redirect: {name: 'recycleBinSuper'},
            router: 'parent1',
            path: 'recycleBinSuper',
            name: 'recycleBinSuperPage',
            meta: {
              title: '平台回收站',
              breadcrumb: [
                {name: '平台中心'},
                {name: '平台回收站'},
              ]
            },
            children: [
              {
                router: 'recycleBinOfAdmin',
                path: 'recycleBinSuper',
                name: 'recycleBinSuper',
                meta: {
                  invisible: true,
                  title: '平台回收站',
                  breadcrumb: [
                    {name: '平台中心'},
                    {name: '平台回收站'},
                  ]
                }
              }
            ]
          },
        ]
      },
      {
        router: 'parent1',
        path: 'userCenter',
        name: 'userCenter',
        icon: 'iconpingtaiguanliyonghuguanli',
        meta: {
          title: '用户中心',
          invisible: false,
          roleList: ['is_super']
        },
        children: [
          {
            router: 'users',
            path: 'users',
            name: 'users',
            meta: {
              title: '用户管理',
              breadcrumb: [
                {name: '用户中心'},
                {name: '用户管理'},
              ]
            }
          },
        ]
      },
      {
        router: 'parent1',
        path: 'siteSettings',
        name: 'siteSettings',
        icon: 'iconzhandian',
        meta: {
          title: '站点设置',
          invisible: false,
          roleList: ['is_super']
        },
        children: [
          {
            router: 'defaultConfig',
            path: 'defaultConfig',
            name: 'defaultConfig',
            meta: {
              title: '默认配置',
              breadcrumb: [
                {name: '站点设置'},
                {name: '默认配置'},
              ]
            }
          },
          {
            router: 'thirdpartyConfigure',
            path: 'thirdpartyConfigure',
            name: 'thirdpartyConfigure',
            meta: {
              title: '三方配置',
              breadcrumb: [
                {name: '站点设置'},
                {name: '三方配置'},
              ]
            }
          },
          {
            icon: 'none',
            redirect: {name: 'superNotice'},
            router: 'parent1',
            path: 'superNotice',
            name: 'superNoticePage',
            meta: {
              title: '通知公告',
              breadcrumb: [
                {name: '站点设置'},
                {name: '通知公告'},
              ]
            },
            children: [
              {
                router: 'superNotice',
                path: 'superNotice',
                name: 'superNotice',
                meta: {
                  invisible: true,
                  title: '通知公告',
                  breadcrumb: [
                    {name: '站点设置'},
                    {name: '通知公告'},
                  ]
                }
              },
              {
                router: 'superNoticeAddOrEdit',
                path: 'superNoticeAddOrEdit',
                name: 'superNoticeAddOrEdit',
                meta: {
                  invisible: true,
                  title: '新增/编辑公告',
                  breadcrumb: [
                    {name: '站点设置'},
                    {name: '通知公告', path: '/genBackstage/siteSettings/superNotice'},
                    {name: '新增/编辑公告'},
                  ]
                }
              },
            ]
          },
          {
            router: 'systemUpdate',
            path: 'systemUpdate',
            name: 'systemUpdate',
            meta: {
              title: '系统更新',
              breadcrumb: [
                {name: '站点设置'},
                {name: '系统更新'},
              ]
            }
          },
          {
            router: 'helpCenter',
            path: 'helpCenter',
            name: 'helpCenter',
            meta: {
              title: '帮助中心',
              breadcrumb: [
                {name: '站点设置'},
                {name: '帮助中心'},
              ]
            }
          },
        ]
      },
      {
        router: 'parent1',
        path: 'accountCenter',
        name: 'accountCenter',
        icon: 'icongerenzhongxin',
        meta: {title:'个人中心'},
        children: [
          {
            icon: 'none',
            redirect: {name: 'accountInfo'},
            router: 'parent1',
            path: 'accountInfo',
            name: 'accountInfoPage',
            meta: {
              title:'个人信息',
              breadcrumb: [
                {name: '个人中心'},
                {name: '个人信息'},
              ]
            },
            children: [
              {
                router: 'accountInfo',
                path: 'accountInfo',
                name: 'accountInfo',
                meta: {
                  invisible: true,
                  title:'个人信息',
                  breadcrumb: [
                    {name: '个人中心'},
                    {name: '个人信息'},
                  ]
                }
              },
            ]
          },
          {
            router: 'loginLog',
            path: 'loginLog',
            name: 'loginLog',
            meta: {
              title:'登录日志',
              breadcrumb: [
                {name: '登录日志'},
                {name: '登录日志'},
              ]
            }
          },
        ]
      },
    ]
  },
  {
    router: 'help',
    name: 'help',
    redirect: '/help/helpArticleIndex',
    children: [
      {
        router: 'helpArticleIndex',
        path: 'helpArticleIndex/:classId?',
        name: 'helpArticleIndex',
        meta: {
          title:'文档中心',
        }
      },
      {
        router: 'helpArticleDetails',
        path: 'helpArticleDetails/:classId?/:articleId?',
        name: 'helpArticleDetails',
        meta: {
          title:'文档中心',
        }
      },
    ]
  }

]

const options = {
  routes: parseRoutes(routesConfig, routerMap)
}

export default options
